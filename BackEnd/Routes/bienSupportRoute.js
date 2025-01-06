const express = require('express');
const {
    createBienSupport,
    getAllBiensSupports,
    getBienSupportById,
    updateBienSupport,
    deleteBienSupport,
    getValeurBiens
} = require('../Controllers/bienSupportController');

const router = express.Router();
//other route
router.get('/valeurBien/:IdValeurMetier', getValeurBiens)

// Routes CRUD pour le modèle Bien Support
router.post('/', createBienSupport);         // Créer un nouveau Bien Support
router.get('/', getAllBiensSupports);        // Récupérer tous les Biens Supports
router.get('/:id', getBienSupportById);     // Récupérer un Bien Support par ID
router.put('/:id', updateBienSupport);      // Mettre à jour un Bien Support
router.delete('/:id', deleteBienSupport);   // Supprimer un Bien Support

module.exports = router;
