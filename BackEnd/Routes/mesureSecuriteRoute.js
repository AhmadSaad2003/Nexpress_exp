const express = require('express');
const {
    createMesureSecurite,
    getAllMesuresSecurite,
    getMesureSecuriteById,
    updateMesureSecurite,
    deleteMesureSecurite
} = require('../Controllers/mesureSecuriteController');

const router = express.Router();

// Routes CRUD pour le modèle MesureSecurite
router.post('/', createMesureSecurite);   // Créer une nouvelle mesure de sécurité
router.get('/', getAllMesuresSecurite);   // Récupérer toutes les mesures de sécurité
router.get('/:id', getMesureSecuriteById); // Récupérer une mesure de sécurité par ID
router.put('/:id', updateMesureSecurite);  // Mettre à jour une mesure de sécurité
router.delete('/:id', deleteMesureSecurite); // Supprimer une mesure de sécurité

module.exports = router;
