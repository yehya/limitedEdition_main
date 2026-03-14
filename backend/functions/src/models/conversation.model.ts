// CONTEXT: Conversation model for customer-provider messaging.

import { BaseModel } from './base.model';
import { Localized } from '../types/localization.types';

export interface Message {
  id: string;
  senderId: string;
  text: string; // Actual message text (not localized - user's input)
  timestamp: Date;
  read: boolean;
  // System messages could be localized (e.g., "Job completed")
  isSystemMessage?: boolean;
  systemMessageText?: Localized<string>;
}

export interface Conversation extends BaseModel {
  jobId: string;
  customerId: string;
  providerId: string;
  messages: Message[];
  lastMessageAt?: Date;
  // Could add localized conversation summaries in future
  summary?: Localized<string>;
}
