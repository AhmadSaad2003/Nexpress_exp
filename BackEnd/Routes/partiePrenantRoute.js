const express = require('express');
const {
    createPartiePrenant,
    getAllPartiesPrenantes,
    getPartiePrenantById,
    updatePartiePrenant,
    deletePartiePrenant
} = require('../Controllers/partiePrenantController');

const router = express.Router();

// Routes CRUD pour le modèle PartiePrenant
router.post('/', createPartiePrenant);           // Créer une nouvelle partie prenante
router.get('/', getAllPartiesPrenantes);         // Récupérer toutes les parties prenantes
router.get('/:id', getPartiePrenantById);       // Récupérer une partie prenante par ID
router.put('/:id', updatePartiePrenant);        // Mettre à jour une partie prenante
router.delete('/:id', deletePartiePrenant);     // Supprimer une partie prenante

module.exports = router;
