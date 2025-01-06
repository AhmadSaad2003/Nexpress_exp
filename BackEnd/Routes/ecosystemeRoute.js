const express = require('express');
const {
    createEcosysteme,
    getAllEcosystemes,
    getEcosystemeById,
    updateEcosysteme,
    deleteEcosysteme
} = require('../Controllers/ecosystemeController');

const router = express.Router();

// Routes CRUD pour le modèle Ecosysteme
router.post('/', createEcosysteme);           // Créer un nouvel écosystème
router.get('/', getAllEcosystemes);           // Récupérer tous les écosystèmes
router.get('/:id', getEcosystemeById);      // Récupérer un écosystème par ID
router.put('/:id', updateEcosysteme);       // Mettre à jour un écosystème
router.delete('/:id', deleteEcosysteme);    // Supprimer un écosystème

module.exports = router;
