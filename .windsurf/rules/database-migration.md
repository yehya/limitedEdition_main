---
description: Database migration strategy and coupling analysis
always_on: true
---

# Database Migration Strategy

## Current Coupling Issues

### ❌ ISSUE 1: Geolocation Tied to Firestore
**Location:** `provider.repository.ts` - `findNearby()`
**Problem:** Uses `geofire-common` which is Firestore-specific (geohash queries)
**Impact:** Cannot migrate geolocation queries to Supabase/Postgres without rewrite

### ❌ ISSUE 2: Query Return Type Leakage
**Location:** `base.repository.ts` - `createQuery()`
**Problem:** Returns `firestore.Query` type
**Impact:** Exposes Firestore internals to subclasses

### ❌ ISSUE 3: Missing Pagination Interface
**Location:** All repository methods
**Problem:** No pagination in interface, only in utils
**Impact:** Each database needs custom pagination implementation

### ❌ ISSUE 4: Missing Query Builder Abstraction
**Location:** All repositories
**Problem:** Direct Firestore query syntax (`.where()`, `.orderBy()`)
**Impact:** Query logic tied to Firestore API

### ❌ ISSUE 5: Array Query Operations
**Location:** `provider.repository.ts`, `job.repository.ts`
**Problem:** Uses Firestore-specific operators (`array-contains`, `in`)
**Impact:** Not all databases support these operators

### ❌ ISSUE 6: Geohash Field Assumption
**Location:** `provider.repository.ts`
**Problem:** Assumes `geohash` field exists (Firestore pattern)
**Impact:** Supabase uses PostGIS, different field structure

## ✅ What's Already Good

1. **Date Abstraction** - Models use `Date`, repository converts to/from Firestore.Timestamp
2. **Interface Layer** - Services depend on interfaces, not implementations
3. **No Firestore in Services** - Business logic is database-agnostic
4. **Conversion Layer** - `toFirestore()` and `fromFirestore()` isolate conversions

## 🎯 Migration Path to Supabase

### Phase 1: Abstract Query Builder
Create database-agnostic query builder:
```typescript
interface IQueryBuilder<T> {
  where(field: string, operator: string, value: any): IQueryBuilder<T>;
  orderBy(field: string, direction: 'asc' | 'desc'): IQueryBuilder<T>;
  limit(count: number): IQueryBuilder<T>;
  execute(): Promise<T[]>;
}
```

### Phase 2: Abstract Geolocation
Create location service abstraction:
```typescript
interface ILocationService {
  findNearby<T>(
    items: T[],
    location: Location,
    radiusKm: number,
    getLocation: (item: T) => Location
  ): T[];
}
```

### Phase 3: Pagination in Interface
Add to `IBaseRepository`:
```typescript
findManyPaginated(
  filters: Partial<T>,
  options: PaginationOptions
): Promise<PaginatedResult<T>>;
```

### Phase 4: Create Supabase Implementation
```typescript
class SupabaseJobRepository implements IJobRepository {
  // Implement all interface methods using Supabase client
}
```

### Phase 5: Swap in DI
```typescript
// Before
const jobRepo = new FirebaseJobRepository();

// After
const jobRepo = new SupabaseJobRepository();
// Zero service changes!
```

## 🚨 Critical Rules for New Code

1. **Never expose database-specific types** in interfaces
2. **Never use database-specific query syntax** in services
3. **Always abstract location queries** through service layer
4. **Always use pagination** in repository interfaces
5. **Never assume database features** (geohash, array-contains, etc.)

## Database Feature Comparison

| Feature | Firestore | Supabase (Postgres) |
|---------|-----------|---------------------|
| Geolocation | geohash + geofire-common | PostGIS (native) |
| Array queries | array-contains | ANY() operator |
| Full-text search | Limited | Native (tsvector) |
| Joins | None (denormalize) | Native |
| Transactions | Limited | Full ACID |
| Real-time | Native | Native (via websockets) |

## Migration Checklist

- [ ] Abstract query builder
- [ ] Abstract geolocation service
- [ ] Add pagination to all interfaces
- [ ] Remove `createQuery()` from base repository
- [ ] Create query builder interface
- [ ] Implement Firestore query builder
- [ ] Test with mock Supabase implementation
