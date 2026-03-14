---
description: Firebase architecture and build plan for SuperHome
always_on: true
---

# SuperHome - Firebase Architecture Plan

## Firebase Services

### Authentication
- **Customer:** Phone number + OTP (easiest possible)
- **Provider:** Email + password (need more info)
- **Admin:** Email + password with admin claims

### Firestore Database

```
users/
  {userId}/
    role: "customer" | "provider" | "admin"
    name: string
    phone: string
    email: string
    createdAt: timestamp

customers/
  {userId}/
    addresses: [{ label, lat, lng, formatted }]
    defaultAddress: string
    abTestGroup: "A" | "B"

providers/
  {userId}/
    services: ["plumbing", "electrical", ...]
    rating: number
    totalJobs: number
    available: boolean
    location: { lat, lng }
    verified: boolean

jobs/
  {jobId}/
    customerId: string
    providerId: string | null
    status: "pending" | "matching" | "confirmed" | "in_progress" | "completed" | "cancelled"
    service: string
    description: string
    aiSummary: string
    address: { lat, lng, formatted }
    timeSlot: { start, end }
    price: number | null
    createdAt: timestamp
    completedAt: timestamp | null

conversations/
  {jobId}/
    messages: subcollection
      {messageId}/
        role: "user" | "ai" | "system"
        text: string
        timestamp: timestamp

admin/
  config/
    abTestConfig: { groupARatio: 0.5 }
    serviceCategories: [...]
    pricing: {...}
```

### Cloud Functions

- **AI Chat Processing:** Process user messages, extract intent, suggest time slots
- **Provider Matching:** Auto-match best provider based on location, rating, availability
- **Job Lifecycle:** Handle status transitions, notifications
- **Payment Processing:** Handle payments on job completion
- **Push Notifications:** Job updates, provider alerts

### Cloud Messaging (FCM)
- Customer: Job status updates
- Provider: New job alerts, reminders

### Firebase App Hosting
- **Testing:** superhome-testing (current)
- **Production:** superhome-production (TBD)

## Build Phases

### Phase 1: Core Customer Flow (MVP)
1. Phone auth signup/login (one screen at a time)
2. AI chat interface (describe your need)
3. Time slot selection (3 options)
4. Job confirmation screen
5. Job status tracking
6. Basic rating after completion

### Phase 2: Provider System
1. Provider auth + onboarding
2. Available jobs list
3. Job accept/decline
4. Navigation to customer
5. Job completion flow
6. Earnings dashboard

### Phase 3: Admin Dashboard
1. Real-time job monitoring
2. Provider management
3. Customer management
4. Analytics (jobs, revenue, ratings)
5. A/B test configuration
6. Service category management

### Phase 4: Polish & Scale
1. Payment integration
2. Push notifications
3. Provider ratings & reviews
4. Scheduling optimization
5. AI improvements
6. Marketing & growth tools

## AI Integration

- **Option A:** OpenAI API via Cloud Functions
- **Option B:** Google Gemini API (Firebase native)
- AI extracts: service type, urgency, description
- AI generates: summary, time slots, price estimate
