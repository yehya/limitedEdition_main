// CONTEXT: Conversation model for customer-provider messaging.

import { BaseModel } from './base.model';

export type MessageRole = 'customer' | 'provider' | 'ai';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface Conversation extends BaseModel {
  jobId: string;
  messages: Message[];
}
