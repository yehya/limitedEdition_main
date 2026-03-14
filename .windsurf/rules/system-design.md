---
description: SuperHome system design and architecture
always_on: true
---

# SuperHome - System Design

## Vision

The easiest, most innovative home services app in the world. Zero decision fatigue. AI-powered. Frictionless.

## Core Concept

User tells AI what they need → AI handles everything → Service happens.

No browsing providers. No comparing prices. No scheduling headaches. Just say what you need.

## Three User Types

### 1. Customer (Mobile App - Expo)
- Opens app → Talks to AI → Gets service
- AI suggests 3 time slots (e.g., "Now", "Today 4-6pm", "Tomorrow 10am-12pm")
- AI picks the best provider automatically
- Payment is seamless and automatic

### 2. Provider/Contractor (Mobile App - Expo)
- Signs in → Sees available jobs
- Accepts/declines jobs
- Navigates to location
- Marks job complete
- Gets paid

### 3. Admin (Web Dashboard - Next.js or Expo Web)
- Manages providers, customers, services
- Monitors jobs in real-time
- Handles disputes
- Analytics and reporting
- A/B test management

## User Flow (Customer)

```
1. Open app
2. AI chat: "What do you need?"
3. User types: "My kitchen sink is leaking"
4. AI responds: "Got it! I'll get a plumber to fix your leaking sink."
5. AI suggests 3 time slots
6. User taps one
7. AI confirms: "Done! Ahmad will be there tomorrow 10am-12pm"
8. Service happens
9. Auto-payment + rating
```

## A/B Test: Two UI Designs

### Design A (Default): AI Chat Interface
- Full conversational AI experience
- User describes need in natural language
- AI handles all decisions

### Design B: Quick Select Interface
- Category grid (Plumbing, Electrical, Cleaning, etc.)
- Tap category → Describe issue → Pick time
- More traditional but still minimal

## Services (Initial)

- Plumbing
- Electrical
- Cleaning
- AC/HVAC
- Painting
- Handyman
- Pest Control
- Carpentry

## Revenue Model

- Commission per job (% from provider)
- Service fee from customer
- Premium/priority scheduling
