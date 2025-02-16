const express = require('express');
const {
    createPACS,
    getAllPACS,
    getPACSById,
    updatePACS,
    deletePACS,
    getAppPacs
} = require('../Controllers/PACSController');

const router = express.Router();
//other route 
router.get('/appPacs/:IdApp', getAppPacs)

// Routes CRUD pour le modèle PACS
router.post('/', createPACS);   // Créer un nouveau PACS
router.get('/', getAllPACS);    // Récupérer tous les PACS
router.get('/:id', getPACSById); // Récupérer un PACS par ID
router.put('/:pacsId', updatePACS);  // Mettre à jour un PACS
router.delete('/:pacsId', deletePACS); // Supprimer un PACS

module.exports = router;
