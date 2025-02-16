const express = require('express');
const {
    createCheminStrategique,
    getAllCheminsStrategiques,
    getCheminStrategiqueById,
    updateCheminStrategique,
    deleteCheminStrategique,
    getSourceStrat
} = require('../Controllers/cheminStrategiqueController');

const router = express.Router();
router.get('/sourceStrat/:IdSourceRisque', getSourceStrat)
// Routes CRUD pour le modèle CheminStrategique
router.post('/', createCheminStrategique);   // Créer un nouveau chemin stratégique
router.get('/', getAllCheminsStrategiques);   // Récupérer tous les chemins stratégiques
router.get('/:id', getCheminStrategiqueById); // Récupérer un chemin stratégique par ID
router.put('/:stratId', updateCheminStrategique);  // Mettre à jour un chemin stratégique
router.delete('/:stratId', deleteCheminStrategique); // Supprimer un chemin stratégique

module.exports = router;
