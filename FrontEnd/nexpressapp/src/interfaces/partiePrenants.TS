export interface PartiePrenant {
  id: number; // Unique identifier for the PartiePrenant
  Nom: string; // Name of the PartiePrenant
  Activite: string; // Activity of the PartiePrenant
  Depandance: number; // Dependency value
  Penetration: number; // Penetration value
  Maturite: number; // Maturity level
  Confiance: number; // Trust level
  NiveauMenace: number; // Threat level
  IdEcosysteme: number; // Foreign key referencing the associated Ecosysteme
  createdAt?: Date; // Timestamp when the record was created (optional)
  updatedAt?: Date; // Timestamp when the record was last updated (optional)
}
