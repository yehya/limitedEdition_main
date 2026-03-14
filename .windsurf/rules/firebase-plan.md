---
description: Firebase architecture and build plan for SuperHome
always_on: true
---

# Firebase Plan

## Auth
**Customer:** Phone + OTP | **Provider:** Email + password | **Admin:** Email + password + admin claims

## Firestore Schema
```
users/{userId}: role, name, phone, email, createdAt
customers/{userId}: addresses[], defaultAddress, abTestGroup
providers/{userId}: services[], rating, totalJobs, available, location, verified
jobs/{jobId}: customerId, providerId, status, service, description, aiSummary, address, timeSlot, price, createdAt, completedAt
conversations/{jobId}/messages/{messageId}: role, text, timestamp
admin/config: abTestConfig, serviceCategories, pricing
```

## Cloud Functions
- **processAIChat:** Extract intent, suggest time slots
- **matchProvider:** Auto-match by location, rating, availability
- **jobLifecycle:** Status transitions, notifications
- **processPayment:** Handle payments on completion
- **pushNotifications:** Job updates, provider alerts

## Hosting
**Testing:** superhome-testing | **Production:** TBD

## Build Phases
**Phase 1 (MVP):** Phone auth, AI chat, time slots, confirmation, tracking, rating
**Phase 2:** Provider auth/onboarding, jobs list, accept/decline, navigation, completion, earnings
**Phase 3:** Admin dashboard (monitoring, management, analytics, A/B config)
**Phase 4:** Payments, notifications, reviews, optimization, AI improvements, growth

## AI
**Options:** OpenAI API or Google Gemini | **Extracts:** service type, urgency, description | **Generates:** summary, time slots, price estimate
