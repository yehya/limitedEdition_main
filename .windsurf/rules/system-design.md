---
description: SuperHome system design and architecture
always_on: true
---

# SuperHome - System Design

**Vision:** Easiest home services app. Zero decision fatigue. AI-powered.

**Core:** User tells AI what they need → AI handles everything → Service happens.

## User Types

**Customer (Mobile):** AI chat → Pick time slot → Service happens → Auto-payment
**Provider (Mobile):** See jobs → Accept → Navigate → Complete → Get paid
**Admin (Web):** Manage providers/customers/services, monitor jobs, analytics, A/B tests

## Customer Flow
1. AI: "What do you need?"
2. User: "Kitchen sink leaking"
3. AI suggests 3 time slots
4. User taps one
5. Confirmed
6. Service + auto-payment + rating

## A/B Test
**A (Default):** AI chat interface
**B:** Category grid → Describe → Pick time

## Services
Plumbing, Electrical, Cleaning, AC/HVAC, Painting, Handyman, Pest Control, Carpentry

## Revenue
Commission per job, service fee, premium scheduling
