const express = require('express');
const {
    createScenarioOperationnel,
    getAllScenarioOperationnels,
    getScenarioOperationnelById,
    updateScenarioOperationnel,
    deleteScenarioOperationnel
} = require('../Controllers/cheminOperationnelController');

const router = express.Router();

// Routes CRUD pour le modèle ScenarioOperationnel
router.post('/', createScenarioOperationnel);   // Créer un nouveau scénario opérationnel
router.get('/', getAllScenarioOperationnels);   // Récupérer tous les scénarios opérationnels
router.get('/:id', getScenarioOperationnelById); // Récupérer un scénario opérationnel par ID
router.put('/:id', updateScenarioOperationnel);  // Mettre à jour un scénario opérationnel
router.delete('/:id', deleteScenarioOperationnel); // Supprimer un scénario opérationnel

module.exports = router;
