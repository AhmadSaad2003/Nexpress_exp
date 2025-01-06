const express = require('express');
const {
    createEcart,
    getAllEcarts,
    getEcartById,
    updateEcart,
    deleteEcart,
    getSocleEcart
} = require('../Controllers/ecartController');

const router = express.Router();
//other route
router.get('/socleEcart/:IdSocleSecurite', getSocleEcart)

// Routes CRUD pour le modèle Ecart
router.post('/', createEcart);           // Créer un nouveau écart
router.get('/', getAllEcarts);           // Récupérer tous les écarts
router.get('/:IdEcart', getEcartById);       // Récupérer un écart par ID
router.put('/:IdEcart', updateEcart);        // Mettre à jour un écart
router.delete('/:IdEcart', deleteEcart);     // Supprimer un écart

module.exports = router;
