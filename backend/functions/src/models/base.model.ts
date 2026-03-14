// CONTEXT: Base model interface with common fields for all entities.
// All models should extend this for consistency.

export interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
