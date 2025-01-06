export interface EvenementRedoute {
  id: number; // Unique identifier for the EvenementRedoute
  Name: string; // Name of the EvenementRedoute
  Description: string; // Description of the EvenementRedoute
  TypeEvent: string; // Type of the event (e.g., "natural", "technological")
  Consequence: string; // Consequence of the event
  IdValeurMetier: number; // Foreign key referencing the associated ValeurMetier
  createdAt?: Date; // Timestamp when the record was created (optional)
  updatedAt?: Date; // Timestamp when the record was last updated (optional)

}
