const express = require('express');
const { createMission, getAllMissions, getMissionById, updateMission, deleteMission, getAppMissions } = require('../Controllers/missionController');

const router = express.Router();

//other routes
router.get('/appMissions/:Idapp',getAppMissions);

// Routes CRUD pour le modèle Mission
router.post('/', createMission);         // Créer une nouvelle mission
router.get('/', getAllMissions);         // Récupérer toutes les missions
router.get('/:id', getMissionById);     // Récupérer une mission par ID
router.put('/:missionId', updateMission);      // Mettre à jour une mission
router.delete('/:missionId', deleteMission);   // Supprimer une mission

module.exports = router;
