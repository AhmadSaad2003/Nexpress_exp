const ValeurMetier = require('../Models/valeurMetierModel'); // Importer le modèle ValeurMetier

// Créer une nouvelle Valeur Métier
const createValeurMetier = async (req, res) => {
    try {
        const { Nom, Nature, Description, EntiteResponsable, IdMission } = req.body;
        const newValeurMetier = await ValeurMetier.create({ Nom, Nature, Description, EntiteResponsable, IdMission });
        res.status(201).json(newValeurMetier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de la Valeur Métier.' });
    }
};

// Récupérer toutes les Valeurs Métier
const getAllValeursMetier = async (req, res) => {
    try {
        const valeursMetier = await ValeurMetier.findAll();
        res.status(200).json(valeursMetier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des Valeurs Métier.' });
    }
};

// Récupérer une Valeur Métier par ID
const getValeurMetierById = async (req, res) => {
    try {
        const { id } = req.params;
        const valeurMetier = await ValeurMetier.findByPk(id);
        if (!valeurMetier) {
            return res.status(404).json({ error: 'Valeur Métier non trouvée.' });
        }
        res.status(200).json(valeurMetier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la Valeur Métier.' });
    }
};

// Mettre à jour une Valeur Métier
const updateValeurMetier = async (req, res) => {
    try {
        const { valeurId } = req.params;
        const { Nom, Nature, Description, EntiteResponsable, IdMission } = req.body;
        const valeurMetier = await ValeurMetier.findByPk(valeurId);
        if (!valeurMetier) {
            return res.status(404).json({ error: 'Valeur Métier non trouvée.' });
        }
        await valeurMetier.update({ Nom, Nature, Description, EntiteResponsable, IdMission });
        res.status(200).json(valeurMetier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la Valeur Métier.' });
    }
};

// Supprimer une Valeur Métier
const deleteValeurMetier = async (req, res) => {
    try {
        const { valeurId } = req.params;
        const valeurMetier = await ValeurMetier.findByPk(valeurId);
        if (!valeurMetier) {
            return res.status(404).json({ error: 'Valeur Métier non trouvée.' });
        }
        await valeurMetier.destroy();
        res.status(200).json({ message: 'Valeur Métier supprimée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la Valeur Métier.' });
    }
};

const getMissionValeuMetier = async (req, res) => {
    try {
      const {IdMission} = req.params; // `authenticate` middleware adds `req.user`
      const valeurMetiers = await ValeurMetier.findAll({ where: { IdMission } });
      res.status(200).json(valeurMetiers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching projects", error });
    }
};

module.exports = { createValeurMetier, getAllValeursMetier, getValeurMetierById, updateValeurMetier, deleteValeurMetier, getMissionValeuMetier };
