const express = require('express');
const {
    createSourceRisque,
    getAllSourceRisque,
    getSourceRisqueById,
    updateSourceRisque,
    deleteSourceRisque
} = require('../Controllers/sourceRisqueController');

const router = express.Router();

// Routes CRUD pour le modèle SourceRisque
router.post('/', createSourceRisque);           // Créer une nouvelle source de risque
router.get('/', getAllSourceRisque);           // Récupérer toutes les sources de risque
router.get('/:id', getSourceRisqueById);      // Récupérer une source de risque par ID
router.put('/:id', updateSourceRisque);       // Mettre à jour une source de risque
router.delete('/:id', deleteSourceRisque);    // Supprimer une source de risque

module.exports = router;
