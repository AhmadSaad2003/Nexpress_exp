export interface Mission {
  id: number; // Unique identifier for the Mission
  description?: string; // Optional description of the mission
  Idapp: number; // Foreign key referencing the associated App
  createdAt?: Date; // Timestamp when the record was created (optional)
  updatedAt?: Date; // Timestamp when the record was last updated (optional)
}
