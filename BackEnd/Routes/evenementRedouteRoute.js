const express = require('express');
const {
    createEvenementRedoute,
    getAllEvenementsRedoutes,
    getEvenementRedouteById,
    updateEvenementRedoute,
    deleteEvenementRedoute,
    getValeurEvents
} = require('../Controllers/evenementRedouteController');

const router = express.Router();

//other route
router.get('/valeurEvent/:IdValeurMetier', getValeurEvents)

// Routes CRUD pour le modèle Evenement Redouté
router.post('/', createEvenementRedoute);         // Créer un nouvel Evenement Redouté
router.get('/', getAllEvenementsRedoutes);         // Récupérer tous les Evenements Redoutés
router.get('/:id', getEvenementRedouteById);     // Récupérer un Evenement Redouté par ID
router.put('/:IdEvent', updateEvenementRedoute);      // Mettre à jour un Evenement Redouté
router.delete('/:IdEvent', deleteEvenementRedoute);   // Supprimer un Evenement Redouté

module.exports = router;
