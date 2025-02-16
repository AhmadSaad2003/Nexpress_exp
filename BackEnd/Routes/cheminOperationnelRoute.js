const express = require('express');
const {
    createScenarioOperationnel,
    getAllScenarioOperationnels,
    getScenarioOperationnelById,
    updateScenarioOperationnel,
    deleteScenarioOperationnel,
    getScenarioOpp
} = require('../Controllers/cheminOperationnelController');

const router = express.Router();
//other route
router.get('/scenarioOpp/:IdCheminStrategique',getScenarioOpp)

// Routes CRUD pour le modèle ScenarioOperationnel
router.post('/', createScenarioOperationnel);   // Créer un nouveau scénario opérationnel
router.get('/', getAllScenarioOperationnels);   // Récupérer tous les scénarios opérationnels
router.get('/:id', getScenarioOperationnelById); // Récupérer un scénario opérationnel par ID
router.put('/:oppId', updateScenarioOperationnel);  // Mettre à jour un scénario opérationnel
router.delete('/:oppId', deleteScenarioOperationnel); // Supprimer un scénario opérationnel

module.exports = router;
