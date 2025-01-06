export interface SourceRisque {
  id: number; // Unique identifier for SourceRisque
  Name: string; // Name of the SourceRisque
  IdApp: number; // Foreign key referring to the associated App
  createdAt?: Date; // Timestamp for when the record was created (optional)
  updatedAt?: Date; // Timestamp for when the record was last updated (optional)

}
