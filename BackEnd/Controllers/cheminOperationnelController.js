const ScenarioOperationnel = require('../Models/CheminOperationnelModel'); // Importer le modèle ScenarioOperationnel
const CheminStrategique = require('../Models/CheminStrategiqueModel'); // Importer le modèle CheminStrategique

// Créer un nouveau ScenarioOperationnel
const createScenarioOperationnel = async (req, res) => {
    try {
        const { Intitul, IdCheminStrategique, Connaitre, Rentrer, Trouver, Exploiter, Vraisemblence } = req.body;

        // Vérifier l'existence du CheminStrategique
        const cheminStrategique = await CheminStrategique.findByPk(IdCheminStrategique);
        if (!cheminStrategique) {
            return res.status(404).json({ error: 'Chemin stratégique non trouvé.' });
        }

        const newScenarioOperationnel = await ScenarioOperationnel.create({
            Intitul, IdCheminStrategique, Connaitre, Rentrer, Trouver, Exploiter, Vraisemblence
        });

        res.status(201).json(newScenarioOperationnel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du scénario opérationnel.' });
    }
};

// Récupérer tous les ScenarioOperationnels
const getAllScenarioOperationnels = async (req, res) => {
    try {
        const scenarioOperationnels = await ScenarioOperationnel.findAll();
        res.status(200).json(scenarioOperationnels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des scénarios opérationnels.' });
    }
};

// Récupérer un ScenarioOperationnel par ID
const getScenarioOperationnelById = async (req, res) => {
    try {
        const { id } = req.params;
        const scenarioOperationnel = await ScenarioOperationnel.findByPk(id);
        if (!scenarioOperationnel) {
            return res.status(404).json({ error: 'Scénario opérationnel non trouvé.' });
        }
        res.status(200).json(scenarioOperationnel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération du scénario opérationnel.' });
    }
};

// Mettre à jour un ScenarioOperationnel
const updateScenarioOperationnel = async (req, res) => {
    try {
        const { oppId } = req.params;
        const { Intitul, Connaitre, Rentrer, Trouver, Exploiter, Vraisemblence } = req.body;

        const scenarioOperationnel = await ScenarioOperationnel.findByPk(oppId);
        if (!scenarioOperationnel) {
            return res.status(404).json({ error: 'Scénario opérationnel non trouvé.' });
        }

        await scenarioOperationnel.update({
            Intitul, Connaitre, Rentrer, Trouver, Exploiter, Vraisemblence
        });

        res.status(200).json(scenarioOperationnel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du scénario opérationnel.' });
    }
};

// Supprimer un ScenarioOperationnel
const deleteScenarioOperationnel = async (req, res) => {
    try {
        const { oppId } = req.params;
        const scenarioOperationnel = await ScenarioOperationnel.findByPk(oppId);
        if (!scenarioOperationnel) {
            return res.status(404).json({ error: 'Scénario opérationnel non trouvé.' });
        }
        await scenarioOperationnel.destroy();
        res.status(200).json({ message: 'Scénario opérationnel supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression du scénario opérationnel.' });
    }
};

const getScenarioOpp = async (req, res) => {
    try {
      const {IdCheminStrategique} = req.params; 
      const scenariosOpp = await ScenarioOperationnel.findAll({ where: { IdCheminStrategique } });
      res.status(200).json(scenariosOpp);
    } catch (error) {
      res.status(500).json({ message: "Error fetching Scenarios opperationnel", error });
    }
};

module.exports = { createScenarioOperationnel, getAllScenarioOperationnels, getScenarioOperationnelById, updateScenarioOperationnel, deleteScenarioOperationnel, getScenarioOpp };
