---
description: Firebase optimization and cost reduction best practices
always_on: true
---

# Firebase Optimization

## Firestore Pricing Model

**You pay for:**
- **Document reads** - Every document retrieved
- **Document writes** - Every create/update/delete
- **Document deletes** - Every delete operation
- **Storage** - Data stored (GB/month)
- **Network egress** - Data transferred out

**Free tier:** 50K reads, 20K writes, 20K deletes per day

## Critical Rules

### 1. Limit Query Results
```typescript
❌ const all = await collection.get(); // Reads ALL documents
✅ const limited = await collection.limit(100).get(); // Max 100 reads
```

**Rule:** Never query without `.limit()`. Max 500 per query.

### 2. Use Pagination
```typescript
❌ Load all 10,000 jobs at once
✅ Load 20 jobs, then next page on demand
```

**Rule:** Always paginate. Default page size: 20-50 items.

### 3. Cache Aggressively
```typescript
// Client-side
✅ enableIndexedDbPersistence(db);
✅ Use React Query with staleTime
✅ Cache static data (categories, services)
```

**Rule:** Cache everything that doesn't change often.

### 4. Batch Operations
```typescript
❌ for (const doc of docs) await doc.update(); // N writes
✅ const batch = db.batch(); // 1 write operation
   docs.forEach(doc => batch.update(doc));
   await batch.commit();
```

**Rule:** Use batch writes for multiple updates. Max 500 per batch.

### 5. Avoid Array Operations
```typescript
❌ .where('tags', 'array-contains', tag) // Reads all matching docs
✅ Use subcollections or separate documents
```

**Rule:** Denormalize data to avoid array queries.

### 6. Use Composite Indexes
```typescript
// Firestore auto-creates single-field indexes
// For multi-field queries, create composite indexes
✅ .where('status', '==', 'active').where('createdAt', '>', date)
   // Requires composite index: status + createdAt
```

**Rule:** Create indexes for common query patterns.

### 7. Minimize Document Size
```typescript
❌ Store full user object in every job (duplicated data)
✅ Store userId only, fetch user when needed
```

**Rule:** Keep documents small. Max 1MB per document.

### 8. Use Transactions Wisely
```typescript
❌ Use transactions for simple reads
✅ Use transactions only for atomic operations
```

**Rule:** Transactions count as reads + writes. Use sparingly.

### 9. Delete in Batches
```typescript
❌ Delete 10,000 documents at once (expensive)
✅ Delete in batches of 500, schedule cleanup jobs
```

**Rule:** Use Cloud Functions for bulk deletes.

### 10. Monitor Usage
```typescript
✅ Set up billing alerts
✅ Monitor Firestore usage in Firebase Console
✅ Track read/write patterns
```

**Rule:** Review usage weekly. Optimize hot paths.

## Query Optimization Patterns

### Denormalization
```typescript
// Instead of joining users + jobs
❌ jobs.forEach(job => fetchUser(job.userId))

// Store essential user data in job
✅ job: { userId, userName, userPhone }
```

### Subcollections
```typescript
// Instead of array of messages in job
❌ job.messages = [...1000 messages]

// Use subcollection
✅ jobs/{jobId}/messages/{messageId}
```

### Counters
```typescript
// Instead of counting documents
❌ const count = (await collection.get()).size

// Maintain counter
✅ job.messageCount = 42
```

## Pagination Implementation

```typescript
// First page
const first = await collection
  .orderBy('createdAt', 'desc')
  .limit(20)
  .get();

// Next page
const last = first.docs[first.docs.length - 1];
const next = await collection
  .orderBy('createdAt', 'desc')
  .startAfter(last)
  .limit(20)
  .get();
```

## Security Rules Optimization

```typescript
// Expensive: Reads another document
❌ allow read: if get(/databases/$(database)/documents/users/$(userId)).data.isAdmin;

// Cheap: Uses custom claims
✅ allow read: if request.auth.token.admin == true;
```

## Best Practices Summary

1. **Always use `.limit()`** - Default 50, max 500
2. **Paginate everything** - Never load all data
3. **Batch writes** - Group related updates
4. **Denormalize** - Duplicate data to avoid joins
5. **Cache** - Client-side persistence + React Query
6. **Index** - Create composite indexes for queries
7. **Monitor** - Track usage, optimize hot paths
8. **Delete smart** - Batch deletes, scheduled cleanup
9. **Small docs** - Keep documents under 100KB
10. **Custom claims** - Use for auth checks, not document reads
