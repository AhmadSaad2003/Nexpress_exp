const express = require('express');
const { createApp, getAllApps, getAppById, updateApp, deleteApp, getUserApps } = require('../Controllers/appController');
const authenticate = require("../middleware/authenticate");
const router = express.Router();

//specific routes
router.get('/userapps',authenticate, getUserApps );

// Routes CRUD pour le modèle App
router.post('/', authenticate, createApp);         // Créer une nouvelle application
router.get('/', getAllApps);         // Récupérer toutes les applications
router.get('/:id', getAppById);     // Récupérer une application par ID
router.put('/:appId',authenticate, updateApp);      // Mettre à jour une application
router.delete('/:id', deleteApp);   // Supprimer une application



module.exports = router;
