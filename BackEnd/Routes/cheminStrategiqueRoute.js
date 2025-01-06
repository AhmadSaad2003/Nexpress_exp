const express = require('express');
const {
    createCheminStrategique,
    getAllCheminsStrategiques,
    getCheminStrategiqueById,
    updateCheminStrategique,
    deleteCheminStrategique
} = require('../Controllers/cheminStrategiqueController');

const router = express.Router();

// Routes CRUD pour le modèle CheminStrategique
router.post('/', createCheminStrategique);   // Créer un nouveau chemin stratégique
router.get('/', getAllCheminsStrategiques);   // Récupérer tous les chemins stratégiques
router.get('/:id', getCheminStrategiqueById); // Récupérer un chemin stratégique par ID
router.put('/:id', updateCheminStrategique);  // Mettre à jour un chemin stratégique
router.delete('/:id', deleteCheminStrategique); // Supprimer un chemin stratégique

module.exports = router;
