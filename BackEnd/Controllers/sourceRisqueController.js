const SourceRisque = require('../Models/sourceRisqueModel'); // Importer le modèle SourceRisque

// Créer une nouvelle SourceRisque
const createSourceRisque = async (req, res) => {
    try {
        const { Name, IdApp } = req.body;
        const newSourceRisque = await SourceRisque.create({ Name, IdApp });
        res.status(201).json(newSourceRisque);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de la source de risque.' });
    }
};

// Récupérer toutes les sources de risque
const getAllSourceRisque = async (req, res) => {
    try {
        const sourcesRisque = await SourceRisque.findAll();
        res.status(200).json(sourcesRisque);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des sources de risque.' });
    }
};

// Récupérer une source de risque par ID
const getSourceRisqueById = async (req, res) => {
    try {
        const { id } = req.params;
        const sourceRisque = await SourceRisque.findByPk(id);
        if (!sourceRisque) {
            return res.status(404).json({ error: 'Source de risque non trouvée.' });
        }
        res.status(200).json(sourceRisque);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la source de risque.' });
    }
};

// Mettre à jour une source de risque
const updateSourceRisque = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, IdApp } = req.body;
        const sourceRisque = await SourceRisque.findByPk(id);
        if (!sourceRisque) {
            return res.status(404).json({ error: 'Source de risque non trouvée.' });
        }
        await sourceRisque.update({ Name, IdApp });
        res.status(200).json(sourceRisque);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la source de risque.' });
    }
};

// Supprimer une source de risque
const deleteSourceRisque = async (req, res) => {
    try {
        const { id } = req.params;
        const sourceRisque = await SourceRisque.findByPk(id);
        if (!sourceRisque) {
            return res.status(404).json({ error: 'Source de risque non trouvée.' });
        }
        await sourceRisque.destroy();
        res.status(200).json({ message: 'Source de risque supprimée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la source de risque.' });
    }
};

module.exports = { createSourceRisque, getAllSourceRisque, getSourceRisqueById, updateSourceRisque, deleteSourceRisque };
