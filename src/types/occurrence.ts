import { User } from "./user";

export interface Occurrence {
  id: number;
  title: string;
  description: string;
  status: OccurrenceStatus;
  createdAt: string; // strings ISO
  updatedAt: string;
  reportedBy: User;
  attachments: any[];
}

enum OccurrenceStatus {
  OPENED = "OPENED",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}
