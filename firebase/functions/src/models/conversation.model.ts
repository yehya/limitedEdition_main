import { BaseModel } from "./base.model";

export type MessageRole = "user" | "ai" | "system";

export interface Message {
  role: MessageRole;
  text: string;
  timestamp: Date;
}

export interface Conversation extends BaseModel {
  jobId: string;
  messages: Message[];
}
