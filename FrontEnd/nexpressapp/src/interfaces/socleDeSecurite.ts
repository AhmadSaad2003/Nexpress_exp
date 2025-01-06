export interface SocleDeSecurite {
  id: number; // Unique identifier for SocleDeSecurite
  Name: string; // Name of the SocleDeSecurite
  IdApp: number; // Foreign key referring to the associated App
  createdAt?: Date; // Timestamp for when the record was created (optional)
  updatedAt?: Date; // Timestamp for when the record was last updated (optional)

}
