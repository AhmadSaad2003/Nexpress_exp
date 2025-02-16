const express = require('express');
const {
    createPartiePrenant,
    getAllPartiesPrenantes,
    getPartiePrenantById,
    updatePartiePrenant,
    deletePartiePrenant,
    getEcoParties
} = require('../Controllers/partiePrenantController');

const router = express.Router();

//other route
router.get('/ecoParties/:IdEcosysteme', getEcoParties); 


// Routes CRUD pour le modèle PartiePrenant
router.post('/', createPartiePrenant);           // Créer une nouvelle partie prenante
router.get('/', getAllPartiesPrenantes);         // Récupérer toutes les parties prenantes
router.get('/:id', getPartiePrenantById);       // Récupérer une partie prenante par ID
router.put('/:partieId', updatePartiePrenant);        // Mettre à jour une partie prenante
router.delete('/:partieId', deletePartiePrenant);     // Supprimer une partie prenante

module.exports = router;
