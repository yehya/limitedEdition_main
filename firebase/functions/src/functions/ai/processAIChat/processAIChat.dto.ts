// CONTEXT: AI chat function DTOs. The AI chat is the primary interface
// for SuperHome customers. User describes what they need → AI processes
// → returns service type, summary, time slots, and price estimate.

import { ServiceType } from "@models/provider.model";
import { TimeSlot } from "@models/job.model";

export interface ProcessAIChatRequest {
  message: string;
}

export interface ProcessAIChatResponse {
  service: ServiceType;
  summary: string;
  timeSlots: TimeSlot[];
  estimatedPrice?: number;
}
