---
description: Database migration strategy and coupling analysis
always_on: true
---

# Database Migration Strategy

## ✅ ALL COUPLING ISSUES FIXED

The codebase is now fully database-agnostic. All coupling issues have been resolved:

### ✅ RESOLVED: Geolocation Abstracted
- Created `GeolocationService` with Haversine formula
- Works with any database (Firestore, Supabase, MongoDB)
- No more `geofire-common` dependency

### ✅ RESOLVED: Query Builder Abstraction
- Created `IQueryBuilder<T>` interface
- `FirebaseQueryBuilder` wraps Firestore queries
- No Firestore types exposed outside Firebase layer

### ✅ RESOLVED: Pagination in Interface
- Added `findManyPaginated()` to `IBaseRepository`
- Cursor-based pagination support
- Database-agnostic pagination types

### ✅ RESOLVED: No Direct Firestore Syntax
- All repositories use `query()` builder pattern
- Operators abstracted (`array-contains` → `cs` for Supabase)
- Clean separation of concerns

### ✅ RESOLVED: Date Handling
- Models use `Date` type
- Repositories handle `Date` ↔ `Timestamp` conversion
- Works with any database

### ✅ RESOLVED: Clean Structure
- Removed all business logic
- Framework-only approach
- Ready for any database implementation

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
