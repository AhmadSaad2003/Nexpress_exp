export interface ScenarioOperationnel {
    id: number; // Unique identifier
    Intitul: string; // Title of the operational scenario
    IdCheminStrategique: number; // Foreign key referencing CheminStrategique
    Connaitre: string; // Information to know
    Rentrer: string; // Entry-related details
    Trouver: string; // Search-related details
    Exploiter: string; // Exploitation-related details
    Vraisemblence: string; // Likelihood value, represented by a single character
    createdAt?: Date; // Timestamp when the record was created (optional)
    updatedAt?: Date; // Timestamp when the record was last updated (optional)
  }
  