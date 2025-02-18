export interface PACS {
  id: number; // Unique identifier for the PACS
  MesureDeSecurite: string; // Security measure description (large text)
  Responsable: string; // Person responsible for this measure
  DifficulteDeMisEnOeuvre: string; // Difficulty of implementation (large text)
  Complexite: number; // Complexity level (numeric)
  DureeEcheance: number; // Duration or deadline (numeric)
  Status: 'termine' | 'a lancer' | 'en cours'; // Status with specific values
  IdApp: number; // Foreign key referencing the associated App
  createdAt?: Date; // Timestamp when the record was created (optional)
  updatedAt?: Date; // Timestamp when the record was last updated (optional)
}
