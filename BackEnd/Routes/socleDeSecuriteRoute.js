const express = require('express');
const {
    createSocleDeSecurite,
    getAllSoclesDeSecurite,
    getSocleDeSecuriteById,
    updateSocleDeSecurite,
    deleteSocleDeSecurite,
    getAppSocle
} = require('../Controllers/socleDeSecuriteController');

const router = express.Router();
//other route
router.get('/appSocles/:IdApp', getAppSocle);

// Routes CRUD pour le modèle Socle de Sécurité
router.post('/', createSocleDeSecurite);         // Créer un nouveau Socle de Sécurité
router.get('/', getAllSoclesDeSecurite);        // Récupérer tous les Socles de Sécurité
router.get('/:id', getSocleDeSecuriteById);     // Récupérer un Socle de Sécurité par ID
router.put('/:id', updateSocleDeSecurite);      // Mettre à jour un Socle de Sécurité
router.delete('/:id', deleteSocleDeSecurite);   // Supprimer un Socle de Sécurité

module.exports = router;
