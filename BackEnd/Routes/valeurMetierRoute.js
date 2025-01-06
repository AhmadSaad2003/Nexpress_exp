const express = require('express');
const {
    createValeurMetier,
    getAllValeursMetier,
    getValeurMetierById,
    updateValeurMetier,
    deleteValeurMetier,
    getMissionValeuMetier
} = require('../Controllers/valeurMetierController');

const router = express.Router();

//other routes
router.get('/missionValeurMetier/:IdMission', getMissionValeuMetier);

// Routes CRUD pour le modèle Valeur Métier
router.post('/', createValeurMetier);         // Créer une nouvelle Valeur Métier
router.get('/', getAllValeursMetier);         // Récupérer toutes les Valeurs Métier
router.get('/:id', getValeurMetierById);     // Récupérer une Valeur Métier par ID
router.put('/:valeurId', updateValeurMetier);      // Mettre à jour une Valeur Métier
router.delete('/:valeurId', deleteValeurMetier);   // Supprimer une Valeur Métier

module.exports = router;
