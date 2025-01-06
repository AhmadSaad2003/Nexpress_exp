
export interface ValeurMetier {
  id: number; // Unique identifier for ValeurMetier
  Nom: string; // Name of the ValeurMetier
  Nature: 'Processus' | 'Information'; // Nature can either be 'Processus' or 'Information'
  Description: string; // Description of the ValeurMetier
  EntiteResponsable: string; // Responsible entity for the ValeurMetier
  IdMission: number; // Foreign key referring to the associated Mission
  createdAt?: Date; // Timestamp for when the record was created (optional)
  updatedAt?: Date; // Timestamp for when the record was last updated (optional)
}
