export interface CheminStrategique {
    id: number; // Unique identifier
    Intitul: string; // Title of the strategic path
    Description: string; // Description of the strategic path
    IdSourceRisque: number; // Foreign key referencing SourceRisque
    IdEvenementRedoute: number; // Foreign key referencing EvenementRedoute
    IdPartiePrenant: number; // Foreign key referencing PartiePrenant
    Gravite: string; // Severity level, represented by a single character
    createdAt?: Date; // Timestamp when the record was created (optional)
    updatedAt?: Date; // Timestamp when the record was last updated (optional)
  }
  