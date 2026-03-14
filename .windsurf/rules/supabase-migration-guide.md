---
description: Step-by-step guide for migrating from Firebase to Supabase
---

# Supabase Migration Guide

## Overview
This codebase is designed for easy database migration. All Firebase coupling has been abstracted away. To migrate to Supabase, you only need to implement new repository classes - **zero service changes required**.

## What Makes This Migration-Ready

### ✅ Already Database-Agnostic
1. **Services use interfaces, not implementations**
   - `IUserRepository`, `IJobRepository`, etc.
   - Services never import Firebase types
   
2. **Date handling abstracted**
   - Models use `Date`, not `Firestore.Timestamp`
   - Repositories handle conversion
   
3. **Query builder pattern**
   - `IQueryBuilder<T>` interface
   - Firestore implementation: `FirebaseQueryBuilder`
   - Supabase implementation: Create `SupabaseQueryBuilder`
   
4. **Geolocation abstracted**
   - `GeolocationService` handles distance calculations
   - Works with any database
   
5. **Pagination in interface**
   - `findManyPaginated()` with cursor support
   - Database-agnostic pagination

## Migration Steps

### Step 1: Install Supabase Client
```bash
bun add @supabase/supabase-js
```

### Step 2: Create Supabase Query Builder
```typescript
// db/supabase/supabase-query-builder.ts
import { SupabaseClient } from '@supabase/supabase-js';
import { IQueryBuilder, QueryOperator, OrderDirection } from '../interfaces/query-builder.interface';

export class SupabaseQueryBuilder<T> implements IQueryBuilder<T> {
  private query: any;
  
  constructor(
    private client: SupabaseClient,
    private tableName: string
  ) {
    this.query = client.from(tableName).select('*');
  }
  
  where(field: string, operator: QueryOperator, value: any): IQueryBuilder<T> {
    // Map operators to Supabase syntax
    const opMap = {
      '==': 'eq',
      '!=': 'neq',
      '>': 'gt',
      '>=': 'gte',
      '<': 'lt',
      '<=': 'lte',
      'in': 'in',
      'array-contains': 'cs', // contains
    };
    
    this.query = this.query[opMap[operator]](field, value);
    return this;
  }
  
  orderBy(field: string, direction: OrderDirection): IQueryBuilder<T> {
    this.query = this.query.order(field, { ascending: direction === 'asc' });
    return this;
  }
  
  limit(count: number): IQueryBuilder<T> {
    this.query = this.query.limit(count);
    return this;
  }
  
  offset(count: number): IQueryBuilder<T> {
    this.query = this.query.range(count, count + 999);
    return this;
  }
  
  async execute(): Promise<T[]> {
    const { data, error } = await this.query;
    if (error) throw error;
    return data as T[];
  }
  
  async executeOne(): Promise<T | null> {
    const { data, error } = await this.query.limit(1).single();
    if (error) return null;
    return data as T;
  }
  
  async count(): Promise<number> {
    const { count, error } = await this.query.count();
    if (error) throw error;
    return count ?? 0;
  }
}
```

### Step 3: Create Supabase Base Repository
```typescript
// db/supabase/base.repository.ts
import { SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { BaseModel } from '../../models/base.model';
import { IBaseRepository } from '../interfaces/base.repository.interface';
import { PaginationOptions, PaginatedResult } from '../interfaces/pagination.interface';
import { IQueryBuilder } from '../interfaces/query-builder.interface';
import { SupabaseQueryBuilder } from './supabase-query-builder';

export abstract class SupabaseBaseRepository<T extends BaseModel> implements IBaseRepository<T> {
  protected client: SupabaseClient;
  protected tableName: string;
  
  constructor(client: SupabaseClient, tableName: string) {
    this.client = client;
    this.tableName = tableName;
  }
  
  protected generateId(): string {
    return uuidv4();
  }
  
  async create(data: Omit<T, keyof BaseModel>, id?: string): Promise<T> {
    const now = new Date();
    const document = {
      id: id ?? this.generateId(),
      ...data,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    };
    
    const { data: result, error } = await this.client
      .from(this.tableName)
      .insert(document)
      .select()
      .single();
    
    if (error) throw error;
    return this.fromDatabase(result);
  }
  
  async update(id: string, data: Partial<Omit<T, keyof BaseModel>>): Promise<T> {
    const updateData = {
      ...data,
      updated_at: new Date().toISOString(),
    };
    
    const { data: result, error } = await this.client
      .from(this.tableName)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return this.fromDatabase(result);
  }
  
  async findById(id: string): Promise<T | null> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return this.fromDatabase(data);
  }
  
  async findMany(filters: Partial<T>): Promise<T[]> {
    let query = this.client.from(this.tableName).select('*');
    
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        query = query.eq(key, value);
      }
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data.map(item => this.fromDatabase(item));
  }
  
  async findManyPaginated(filters: Partial<T>, options: PaginationOptions): Promise<PaginatedResult<T>> {
    const limit = options.limit ?? 20;
    let query = this.client.from(this.tableName).select('*');
    
    // Apply filters
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        query = query.eq(key, value);
      }
    }
    
    // Apply pagination
    const offset = options.offset ?? 0;
    query = query.range(offset, offset + limit);
    
    const { data, error, count } = await query;
    if (error) throw error;
    
    const items = data.map(item => this.fromDatabase(item));
    
    return {
      items,
      hasMore: items.length === limit + 1,
      total: count ?? undefined,
    };
  }
  
  async delete(id: string): Promise<void> {
    const { error } = await this.client
      .from(this.tableName)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
  
  query(): IQueryBuilder<T> {
    return new SupabaseQueryBuilder<T>(this.client, this.tableName);
  }
  
  // Convert Supabase snake_case to camelCase
  protected fromDatabase(data: any): T {
    return {
      ...data,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    } as T;
  }
}
```

### Step 4: Create Supabase Repository Implementations
```typescript
// db/supabase/user.repository.ts
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseBaseRepository } from './base.repository';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { User, UserRole } from '../../models/user.model';

export class SupabaseUserRepository extends SupabaseBaseRepository<User> implements IUserRepository {
  constructor(client: SupabaseClient) {
    super(client, 'users');
  }
  
  async findByRole(role: UserRole): Promise<User[]> {
    return this.query()
      .where('role', '==', role)
      .execute();
  }
  
  async findByPhone(phone: string): Promise<User | null> {
    return this.query()
      .where('phone', '==', phone)
      .executeOne();
  }
  
  async findByEmail(email: string): Promise<User | null> {
    return this.query()
      .where('email', '==', email)
      .executeOne();
  }
}
```

### Step 5: Swap Repositories in DI
```typescript
// Before (Firebase)
const userRepo = new FirebaseUserRepository();
const jobRepo = new FirebaseJobRepository();

// After (Supabase)
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const userRepo = new SupabaseUserRepository(supabase);
const jobRepo = new SupabaseJobRepository(supabase);

// Services remain UNCHANGED!
const userService = new UserService(userRepo);
const jobService = new JobService(jobRepo, providerRepo);
```

## Geolocation with PostGIS

Supabase uses PostgreSQL with PostGIS for geospatial queries:

```typescript
// db/supabase/provider.repository.ts
async findNearby(location: Location, radiusKm: number): Promise<Provider[]> {
  const { data, error } = await this.client
    .rpc('providers_nearby', {
      lat: location.lat,
      lng: location.lng,
      radius_km: radiusKm
    });
  
  if (error) throw error;
  return data.map(item => this.fromDatabase(item));
}
```

SQL function:
```sql
CREATE OR REPLACE FUNCTION providers_nearby(
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  radius_km DOUBLE PRECISION
)
RETURNS SETOF providers AS $$
  SELECT *
  FROM providers
  WHERE ST_DWithin(
    location::geography,
    ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
    radius_km * 1000
  )
  ORDER BY location <-> ST_SetSRID(ST_MakePoint(lng, lat), 4326);
$$ LANGUAGE SQL;
```

## Database Schema Migration

### Firestore → Postgres Mapping
| Firestore | Postgres |
|-----------|----------|
| Collection | Table |
| Document | Row |
| Field | Column |
| Timestamp | TIMESTAMPTZ |
| GeoPoint | GEOGRAPHY(POINT) |
| Array | ARRAY or JSONB |
| Map | JSONB |

### Example Schema
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) UNIQUE,
  email VARCHAR(255) UNIQUE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  services TEXT[] NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0,
  total_jobs INTEGER DEFAULT 0,
  available BOOLEAN DEFAULT TRUE,
  verified BOOLEAN DEFAULT FALSE,
  location GEOGRAPHY(POINT) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_providers_location ON providers USING GIST(location);
CREATE INDEX idx_providers_services ON providers USING GIN(services);
```

## Testing the Migration

1. **Create mock Supabase repository**
2. **Inject into services**
3. **Run existing tests** - they should all pass!
4. **No service changes needed**

## Rollback Strategy

Keep both implementations:
```typescript
const USE_SUPABASE = process.env.USE_SUPABASE === 'true';

const userRepo = USE_SUPABASE
  ? new SupabaseUserRepository(supabase)
  : new FirebaseUserRepository();
```

Gradual migration:
- Week 1: Users only
- Week 2: Jobs
- Week 3: Providers
- Week 4: Full cutover

## Performance Comparison

| Feature | Firestore | Supabase (Postgres) |
|---------|-----------|---------------------|
| Geolocation | Geohash (good) | PostGIS (excellent) |
| Full-text search | Limited | Native (tsvector) |
| Complex queries | Limited | Full SQL |
| Joins | None | Native |
| Cost | Per read/write | Fixed monthly |
| Real-time | Native | Native (websockets) |

## Zero Service Changes Required

**This is the key benefit of our architecture:**
- ✅ Services depend on interfaces
- ✅ No Firestore types in services
- ✅ Date handling abstracted
- ✅ Query builder abstracted
- ✅ Geolocation abstracted
- ✅ Pagination abstracted

**To migrate:** Implement repositories, swap in DI. Done.
