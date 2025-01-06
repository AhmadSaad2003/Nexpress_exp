const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Endpoint pour créer un utilisateur
router.post('/register', userController.createUser);

// Endpoint pour obtenir tous les utilisateurs
router.get('/', userController.getAllUsers);

// Endpoint pour la connexion utilisateur
router.post('/login', userController.loginUser);

module.exports = router;
