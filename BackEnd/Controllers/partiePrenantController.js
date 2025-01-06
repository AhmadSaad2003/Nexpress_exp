const { Model, DataTypes } = require('sequelize');
const PartiePrenant = require('../Models/partiePrenantModel'); // Importer le modèle PartiePrenant
const Ecosysteme = require('../Models/ecosystemeModel'); // Importer le modèle Ecosysteme

// Calculer le NiveauMenace basé sur les autres valeurs
const calculerNiveauMenace = (Depandance, Penetration, Maturite, Confiance) => {
    if (Maturite !== 0 && Confiance !== 0) {
        return (Depandance * Penetration) / (Maturite * Confiance);
    }
    return 0; // Retourner 0 si Maturite ou Confiance sont à 0 pour éviter une division par zéro
};

// Créer une nouvelle PartiePrenant
const createPartiePrenant = async (req, res) => {
    try {
        const { Nom, Activite, Depandance, Penetration, Maturite, Confiance, IdEcosysteme } = req.body;
        
        // Vérifier si Ecosysteme existe
        const ecosysteme = await Ecosysteme.findByPk(IdEcosysteme);
        if (!ecosysteme) {
            return res.status(404).json({ error: 'Ecosysteme non trouvé.' });
        }

        // Calculer le NiveauMenace
        const NiveauMenace = calculerNiveauMenace(Depandance, Penetration, Maturite, Confiance);

        const newPartiePrenant = await PartiePrenant.create({
            Nom, Activite, Depandance, Penetration, Maturite, Confiance, NiveauMenace, IdEcosysteme
        });

        res.status(201).json(newPartiePrenant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création de la partie prenante.' });
    }
};

// Récupérer toutes les PartiesPrenantes
const getAllPartiesPrenantes = async (req, res) => {
    try {
        const partiesPrenantes = await PartiePrenant.findAll();
        res.status(200).json(partiesPrenantes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des parties prenantes.' });
    }
};

// Récupérer une PartiePrenant par ID
const getPartiePrenantById = async (req, res) => {
    try {
        const { id } = req.params;
        const partiePrenant = await PartiePrenant.findByPk(id);
        if (!partiePrenant) {
            return res.status(404).json({ error: 'Partie prenante non trouvée.' });
        }
        res.status(200).json(partiePrenant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la partie prenante.' });
    }
};

// Mettre à jour une PartiePrenant
const updatePartiePrenant = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nom, Activite, Depandance, Penetration, Maturite, Confiance, IdEcosysteme } = req.body;

        // Vérifier si Ecosysteme existe
        const ecosysteme = await Ecosysteme.findByPk(IdEcosysteme);
        if (!ecosysteme) {
            return res.status(404).json({ error: 'Ecosysteme non trouvé.' });
        }

        const partiePrenant = await PartiePrenant.findByPk(id);
        if (!partiePrenant) {
            return res.status(404).json({ error: 'Partie prenante non trouvée.' });
        }

        // Calculer le nouveau NiveauMenace
        const NiveauMenace = calculerNiveauMenace(Depandance, Penetration, Maturite, Confiance);

        // Mettre à jour la PartiePrenant avec le nouveau NiveauMenace
        await partiePrenant.update({
            Nom, Activite, Depandance, Penetration, Maturite, Confiance, NiveauMenace, IdEcosysteme
        });

        res.status(200).json(partiePrenant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la partie prenante.' });
    }
};

// Supprimer une PartiePrenant
const deletePartiePrenant = async (req, res) => {
    try {
        const { id } = req.params;
        const partiePrenant = await PartiePrenant.findByPk(id);
        if (!partiePrenant) {
            return res.status(404).json({ error: 'Partie prenante non trouvée.' });
        }
        await partiePrenant.destroy();
        res.status(200).json({ message: 'Partie prenante supprimée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la partie prenante.' });
    }
};

module.exports = { createPartiePrenant, getAllPartiesPrenantes, getPartiePrenantById, updatePartiePrenant, deletePartiePrenant };
