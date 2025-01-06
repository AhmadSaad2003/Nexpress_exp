export interface BienSupport {
    id: number; // Unique identifier
    Name: string; // Name of the support
    IdValeurMetier: number; // Foreign key referencing ValeurMetier
    createdAt?: Date; // Timestamp when the record was created (optional if handled by Sequelize)
    updatedAt?: Date; // Timestamp when the record was last updated (optional if handled by Sequelize)
  }
  