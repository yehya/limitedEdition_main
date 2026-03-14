import { BaseModel } from './base.model';
import { Localized } from '../types/localization.types';

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  read: boolean;
  isSystemMessage?: boolean;
  systemMessageText?: Localized<string>;
}

export interface Conversation extends BaseModel {
  jobId: string;
  customerId: string;
  providerId: string;
  messages: Message[];
  lastMessageAt?: Date;
  summary?: Localized<string>;
}
