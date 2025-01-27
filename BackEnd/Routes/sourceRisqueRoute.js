const express = require('express');
const {
    createSourceRisque,
    getAllSourceRisque,
    getSourceRisqueById,
    updateSourceRisque,
    deleteSourceRisque,
    getAppSource
} = require('../Controllers/sourceRisqueController');

const router = express.Router();
//other routes
router.get('/appSources/:IdApp', getAppSource)

// Routes CRUD pour le modèle SourceRisque
router.post('/', createSourceRisque);           // Créer une nouvelle source de risque
router.get('/', getAllSourceRisque);           // Récupérer toutes les sources de risque
router.get('/:id', getSourceRisqueById);      // Récupérer une source de risque par ID
router.put('/:sourceId', updateSourceRisque);       // Mettre à jour une source de risque
router.delete('/:sourceId', deleteSourceRisque);    // Supprimer une source de risque

module.exports = router;
