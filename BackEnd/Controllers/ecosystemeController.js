const Ecosysteme = require('../Models/ecosystemeModel'); // Importer le modèle Ecosysteme

// Créer un nouvel Ecosysteme
const createEcosysteme = async (req, res) => {
    try {
        const { Description, IdApp } = req.body;
        const newEcosysteme = await Ecosysteme.create({ Description, IdApp });
        res.status(201).json(newEcosysteme);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'écosystème.' });
    }
};

// Récupérer tous les Ecosystemes
const getAllEcosystemes = async (req, res) => {
    try {
        const ecosystemes = await Ecosysteme.findAll();
        res.status(200).json(ecosystemes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des écosystèmes.' });
    }
};

// Récupérer un Ecosysteme par ID
const getEcosystemeById = async (req, res) => {
    try {
        const { id } = req.params;
        const ecosysteme = await Ecosysteme.findByPk(id);
        if (!ecosysteme) {
            return res.status(404).json({ error: 'Écosystème non trouvé.' });
        }
        res.status(200).json(ecosysteme);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'écosystème.' });
    }
};

// Mettre à jour un Ecosysteme
const updateEcosysteme = async (req, res) => {
    try {
        const { id } = req.params;
        const { Description, IdApp } = req.body;
        const ecosysteme = await Ecosysteme.findByPk(id);
        if (!ecosysteme) {
            return res.status(404).json({ error: 'Écosystème non trouvé.' });
        }
        await ecosysteme.update({ Description, IdApp });
        res.status(200).json(ecosysteme);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'écosystème.' });
    }
};

// Supprimer un Ecosysteme
const deleteEcosysteme = async (req, res) => {
    try {
        const { id } = req.params;
        const ecosysteme = await Ecosysteme.findByPk(id);
        if (!ecosysteme) {
            return res.status(404).json({ error: 'Écosystème non trouvé.' });
        }
        await ecosysteme.destroy();
        res.status(200).json({ message: 'Écosystème supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'écosystème.' });
    }
};

const getAppEcosystemes = async (req, res) => {
    try {
      const {IdApp} = req.params; 
      const ecosystemes = await Ecosysteme.findAll({ where: { IdApp } });
      res.status(200).json(ecosystemes);
    } catch (error) {
      res.status(500).json({ message: "Error fetching Sources risques", error });
    }
};

module.exports = { createEcosysteme, getAllEcosystemes, getEcosystemeById, updateEcosysteme, deleteEcosysteme, getAppEcosystemes };
