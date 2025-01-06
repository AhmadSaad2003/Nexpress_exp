export interface PACS {
  id: number; // Unique identifier for the PACS
  Nom: string; // Name of the PACS
  Type: string; // Type of the PACS
  Impact: number; // The impact value of the PACS
  CoefficientRisques: number; // Risk coefficient of the PACS
  IdApp: number; // Foreign key referencing the associated App
  createdAt?: Date; // Timestamp when the record was created (optional)
  updatedAt?: Date; // Timestamp when the record was last updated (optional)
}
