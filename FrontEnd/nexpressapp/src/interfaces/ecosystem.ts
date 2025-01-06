export interface Ecosysteme {
  id: number; // Unique identifier for the Ecosysteme
  Description: string; // Description of the Ecosysteme
  IdApp: number; // Foreign key referencing the associated App
  createdAt?: Date; // Timestamp when the record was created (optional)
  updatedAt?: Date; // Timestamp when the record was last updated (optional)

}
