export interface MesureSecurite {
  id: number; // Unique identifier for the MesureSecurite
  IdCheminStrategique: number; // Foreign key referencing the associated CheminStrategique
  Mesure: string; // Description of the security measure
  MenaceResiduel: number; // Residual threat (as a float value)
  createdAt?: Date; // Timestamp when the record was created (optional)
  updatedAt?: Date; // Timestamp when the record was last updated (optional)
}
