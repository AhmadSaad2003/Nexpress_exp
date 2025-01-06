export interface Ecart {
    id: number; // Unique identifier for the Ecart
    TypeEcart: string; // Description of the type of Ecart
    Justification: string; // Justification for the Ecart
    IdSocleSecurite: number; // Foreign key referencing the associated SocleDeSecurite
    createdAt?: Date; // Timestamp when the record was created (optional)
    updatedAt?: Date; // Timestamp when the record was last updated (optional)
  }
  