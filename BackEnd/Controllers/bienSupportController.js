const BienSupport = require('../Models/bienSupportModel'); // Importer le modèle BienSupport

// Créer un nouveau Bien Support
const createBienSupport = async (req, res) => {
    try {
        const { Name, IdValeurMetier } = req.body;
        const newBienSupport = await BienSupport.create({ Name, IdValeurMetier });
        res.status(201).json(newBienSupport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du Bien Support.' });
    }
};

// Récupérer tous les Biens Supports
const getAllBiensSupports = async (req, res) => {
    try {
        const biensSupports = await BienSupport.findAll();
        res.status(200).json(biensSupports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des Biens Supports.' });
    }
};

// Récupérer un Bien Support par ID
const getBienSupportById = async (req, res) => {
    try {
        const { id } = req.params;
        const bienSupport = await BienSupport.findByPk(id);
        if (!bienSupport) {
            return res.status(404).json({ error: 'Bien Support non trouvé.' });
        }
        res.status(200).json(bienSupport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération du Bien Support.' });
    }
};

// Mettre à jour un Bien Support
const updateBienSupport = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, IdValeurMetier } = req.body;
        const bienSupport = await BienSupport.findByPk(id);
        if (!bienSupport) {
            return res.status(404).json({ error: 'Bien Support non trouvé.' });
        }
        await bienSupport.update({ Name, IdValeurMetier });
        res.status(200).json(bienSupport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du Bien Support.' });
    }
};

// Supprimer un Bien Support
const deleteBienSupport = async (req, res) => {
    try {
        const { id } = req.params;
        const bienSupport = await BienSupport.findByPk(id);
        if (!bienSupport) {
            return res.status(404).json({ error: 'Bien Support non trouvé.' });
        }
        await bienSupport.destroy();
        res.status(200).json({ message: 'Bien Support supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression du Bien Support.' });
    }
};

const getValeurBiens = async (req, res) => {
    try {
      const {IdValeurMetier} = req.params; 
      const biens = await BienSupport.findAll({ where: { IdValeurMetier } });
      res.status(200).json(biens);
    } catch (error) {
      res.status(500).json({ message: "Error fetching missions", error });
    }
};

module.exports = { createBienSupport, getAllBiensSupports, getBienSupportById, updateBienSupport, deleteBienSupport, getValeurBiens };
