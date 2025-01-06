const express = require('express');
const {
    createPACS,
    getAllPACS,
    getPACSById,
    updatePACS,
    deletePACS
} = require('../Controllers/PACSController');

const router = express.Router();

// Routes CRUD pour le modèle PACS
router.post('/', createPACS);   // Créer un nouveau PACS
router.get('/', getAllPACS);    // Récupérer tous les PACS
router.get('/:id', getPACSById); // Récupérer un PACS par ID
router.put('/:id', updatePACS);  // Mettre à jour un PACS
router.delete('/:id', deletePACS); // Supprimer un PACS

module.exports = router;
