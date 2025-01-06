const EvenementRedoute = require('../Models/evenementRedouteModel'); // Importer le modèle EvenementRedoute

// Créer un nouvel Evenement Redouté
const createEvenementRedoute = async (req, res) => {
    try {
        const { Name, Description, TypeEvent, Consequence, IdValeurMetier } = req.body;
        const newEvenementRedoute = await EvenementRedoute.create({ Name, Description, TypeEvent, Consequence, IdValeurMetier });
        res.status(201).json(newEvenementRedoute);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'Événement Redouté.' });
    }
};

// Récupérer tous les Evenements Redoutés
const getAllEvenementsRedoutes = async (req, res) => {
    try {
        const evenementsRedoutes = await EvenementRedoute.findAll();
        res.status(200).json(evenementsRedoutes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des Événements Redoutés.' });
    }
};

// Récupérer un Evenement Redouté par ID
const getEvenementRedouteById = async (req, res) => {
    try {
        const { id } = req.params;
        const evenementRedoute = await EvenementRedoute.findByPk(id);
        if (!evenementRedoute) {
            return res.status(404).json({ error: 'Événement Redouté non trouvé.' });
        }
        res.status(200).json(evenementRedoute);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'Événement Redouté.' });
    }
};

// Mettre à jour un Evenement Redouté
const updateEvenementRedoute = async (req, res) => {
    try {
        const { IdEvent } = req.params;
        const { Name, Description, TypeEvent, Consequence } = req.body;
        const evenementRedoute = await EvenementRedoute.findByPk(IdEvent);
        if (!evenementRedoute) {
            return res.status(404).json({ error: 'Événement Redouté non trouvé.' });
        }
        await evenementRedoute.update({ Name, Description, TypeEvent, Consequence });
        res.status(200).json(evenementRedoute);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'Événement Redouté.' });
    }
};

// Supprimer un Evenement Redouté
const deleteEvenementRedoute = async (req, res) => {
    try {
        const { IdEvent } = req.params;
        const evenementRedoute = await EvenementRedoute.findByPk(IdEvent);
        if (!evenementRedoute) {
            return res.status(404).json({ error: 'Événement Redouté non trouvé.' });
        }
        await evenementRedoute.destroy();
        res.status(200).json({ message: 'Événement Redouté supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'Événement Redouté.' });
    }
};

const getValeurEvents = async (req, res) => {
    try {
      const {IdValeurMetier} = req.params; 
      const events = await EvenementRedoute.findAll({ where: { IdValeurMetier } });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching missions", error });
    }
};

module.exports = { createEvenementRedoute, getAllEvenementsRedoutes, getEvenementRedouteById, updateEvenementRedoute, deleteEvenementRedoute, getValeurEvents };
