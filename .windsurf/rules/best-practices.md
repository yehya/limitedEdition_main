---
description: Industry best practices and must-have patterns
always_on: true
---

# Best Practices

## Error Handling

### Always Provide Context
```typescript
❌ throw new Error("Failed");
✅ throw new HttpsError("internal", "Failed to create job", { 
    jobId, userId, error: e.message 
});
```

### Structured Logging
```typescript
✅ logger.info("Job created", { jobId, customerId, service });
✅ logger.error("Job creation failed", { error, data });
```

### Graceful Degradation
```typescript
try {
  await sendNotification(userId);
} catch (error) {
  logger.error("Notification failed, continuing", { error });
  // Don't fail the whole operation
}
```

## Validation

### Validate Early
```typescript
function createJob(data: CreateJobInput) {
  // Validate at entry point
  if (!data.customerId) throw new HttpsError("invalid-argument", "customerId required");
  if (!data.service) throw new HttpsError("invalid-argument", "service required");
  
  // Then proceed
  return jobService.create(data);
}
```

### Use Type Guards
```typescript
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

## Idempotency

### Use Idempotency Keys
```typescript
async function createJob(data: CreateJobInput, idempotencyKey: string) {
  const existing = await jobRepo.findByIdempotencyKey(idempotencyKey);
  if (existing) return existing; // Already created
  
  return jobRepo.create({ ...data, idempotencyKey });
}
```

## Retries

### Exponential Backoff
```typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(baseDelay * Math.pow(2, i));
    }
  }
  throw new Error("Max retries exceeded");
}
```

## Rate Limiting

### Implement Rate Limits
```typescript
// Per user, per endpoint
const rateLimiter = new RateLimiter({
  points: 10, // 10 requests
  duration: 60, // per 60 seconds
});

await rateLimiter.consume(userId);
```

## Caching Strategy

### Cache Layers
```typescript
// 1. In-memory (fastest, smallest)
const inMemoryCache = new Map();

// 2. Redis (fast, larger)
const redisCache = new Redis();

// 3. Database (slowest, largest)
const dbCache = firestore();
```

### Cache Invalidation
```typescript
async function updateJob(id: string, data: Partial<Job>) {
  const updated = await jobRepo.update(id, data);
  
  // Invalidate caches
  await cache.delete(`job:${id}`);
  await cache.delete(`jobs:customer:${updated.customerId}`);
  
  return updated;
}
```

## Pagination

### Cursor-Based Pagination
```typescript
interface PaginatedResult<T> {
  items: T[];
  nextCursor?: string;
  hasMore: boolean;
}

async function getJobs(cursor?: string, limit = 20): Promise<PaginatedResult<Job>> {
  let query = jobRepo.createQuery().orderBy('createdAt', 'desc').limit(limit + 1);
  
  if (cursor) {
    const cursorDoc = await jobRepo.findById(cursor);
    query = query.startAfter(cursorDoc);
  }
  
  const items = await query.get();
  const hasMore = items.length > limit;
  
  return {
    items: items.slice(0, limit),
    nextCursor: hasMore ? items[limit - 1].id : undefined,
    hasMore,
  };
}
```

## Security

### Input Sanitization
```typescript
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
```

### Principle of Least Privilege
```typescript
// Give minimum permissions needed
allow read: if request.auth.uid == resource.data.userId;
allow write: if request.auth.uid == resource.data.userId 
            && request.resource.data.userId == request.auth.uid;
```

### Never Trust Client Data
```typescript
❌ const isAdmin = request.data.isAdmin; // Client can fake this
✅ const user = await userRepo.findById(request.auth.uid);
   const isAdmin = user.isAdmin; // Server-verified
```

## Performance

### Lazy Loading
```typescript
// Don't load everything upfront
❌ const jobs = await jobRepo.findAll();

// Load on demand
✅ const jobs = await jobRepo.findMany({ status: 'active' }, { limit: 20 });
```

### Parallel Operations
```typescript
// Sequential (slow)
❌ const user = await userRepo.findById(userId);
   const jobs = await jobRepo.findByUserId(userId);

// Parallel (fast)
✅ const [user, jobs] = await Promise.all([
     userRepo.findById(userId),
     jobRepo.findByUserId(userId),
   ]);
```

### Avoid N+1 Queries
```typescript
// N+1 problem
❌ for (const job of jobs) {
     job.user = await userRepo.findById(job.userId);
   }

// Batch fetch
✅ const userIds = jobs.map(j => j.userId);
   const users = await userRepo.findByIds(userIds);
   const userMap = new Map(users.map(u => [u.id, u]));
   jobs.forEach(j => j.user = userMap.get(j.userId));
```

## Testing

### Test Pyramid
```
    /\
   /E2E\      Few, slow, expensive
  /______\
 /  API   \   More, medium speed
/__________\
/   Unit    \ Many, fast, cheap
```

### Unit Test Pattern
```typescript
describe('JobService', () => {
  it('should create job with valid data', async () => {
    const mockRepo = createMockJobRepository();
    const service = new JobService(mockRepo);
    
    const result = await service.createJob(validData);
    
    expect(result.id).toBeDefined();
    expect(mockRepo.create).toHaveBeenCalledWith(validData);
  });
});
```

## Monitoring

### Key Metrics
```typescript
// Track these metrics
- Response time (p50, p95, p99)
- Error rate
- Request rate
- Database query time
- Cache hit rate
```

### Alerts
```typescript
// Set up alerts for:
- Error rate > 5%
- Response time p95 > 2s
- Database reads > 10K/min
- Failed jobs > 10/min
```

## Documentation

### Self-Documenting Code
```typescript
// Bad
function p(u, j) { ... }

// Good
function assignProviderToJob(userId: string, jobId: string) { ... }
```

### JSDoc for Public APIs
```typescript
/**
 * Creates a new job and assigns it to a provider
 * @param data - Job creation data
 * @returns Created job with assigned provider
 * @throws HttpsError if no provider available
 */
async function createJob(data: CreateJobInput): Promise<Job> { ... }
```

## Deployment

### Feature Flags
```typescript
const features = {
  aiMatching: process.env.ENABLE_AI_MATCHING === 'true',
  autoPayment: process.env.ENABLE_AUTO_PAYMENT === 'true',
};

if (features.aiMatching) {
  provider = await aiMatchingService.findBest(job);
} else {
  provider = await legacyMatchingService.findBest(job);
}
```

### Gradual Rollouts
```typescript
// Roll out to 10% of users first
const rolloutPercentage = 10;
const userHash = hashUserId(userId);
const isInRollout = userHash % 100 < rolloutPercentage;
```

## Code Quality

### DRY (Don't Repeat Yourself)
```typescript
❌ Duplicate logic in multiple places
✅ Extract to shared utility/service
```

### SOLID Principles
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

### Keep Functions Small
```typescript
// Max 50 lines per function
// Max 5 parameters
// Max 3 levels of nesting
```
