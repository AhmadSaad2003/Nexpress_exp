const Ecart = require('../Models/EcartModel'); // Importer le modèle Ecart

// Créer un nouveau Ecart
const createEcart = async (req, res) => {
    try {
        const { TypeEcart, Justification, IdSocleSecurite } = req.body;
        const newEcart = await Ecart.create({ TypeEcart, Justification, IdSocleSecurite });
        res.status(201).json(newEcart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'écart.' });
    }
};

// Récupérer tous les écarts
const getAllEcarts = async (req, res) => {
    try {
        const ecarts = await Ecart.findAll();
        res.status(200).json(ecarts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des écarts.' });
    }
};

// Récupérer un écart par ID
const getEcartById = async (req, res) => {
    try {
        const { id } = req.params;
        const ecart = await Ecart.findByPk(id);
        if (!ecart) {
            return res.status(404).json({ error: 'Écart non trouvé.' });
        }
        res.status(200).json(ecart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'écart.' });
    }
};

// Mettre à jour un écart
const updateEcart = async (req, res) => {
    try {
        const { IdEcart } = req.params;
        const { TypeEcart, Justification } = req.body;
        const ecart = await Ecart.findByPk(IdEcart);
        if (!ecart) {
            return res.status(404).json({ error: 'Écart non trouvé.' });
        }
        await ecart.update({ TypeEcart, Justification });
        res.status(200).json(ecart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'écart.' });
    }
};

// Supprimer un écart
const deleteEcart = async (req, res) => {
    try {
        const { IdEcart } = req.params;
        const ecart = await Ecart.findByPk(IdEcart);
        if (!ecart) {
            return res.status(404).json({ error: 'Écart non trouvé.' });
        }
        await ecart.destroy();
        res.status(200).json({ message: 'Écart supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'écart.' });
    }
};

const getSocleEcart = async (req, res) => {
    try {
      const {IdSocleSecurite} = req.params; 
      const ecarts = await Ecart.findAll({ where: { IdSocleSecurite } });
      res.status(200).json(ecarts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching ecarts", error });
    }
};

module.exports = { createEcart, getAllEcarts, getEcartById, updateEcart, deleteEcart, getSocleEcart };
