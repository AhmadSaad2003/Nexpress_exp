import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Ecosysteme } from "../../interfaces/ecosystem";
import { PartiePrenant } from "../../interfaces/partiePrenants";
import { CheminStrategique } from "../../interfaces/cheminStrategique";
import { MesureSecurite } from "../../interfaces/mesureSecurite";
import { SourceRisque } from "../../interfaces/sourceRisque";
import { EvenementRedoute } from "../../interfaces/evenementRedoute";
import { Mission } from "../../interfaces/mission";
import { ValeurMetier } from "../../interfaces/valeurMetier"
//ecosysteme
import { getappecosys } from "../../services/Atelier3Services/getAppEcosystemeService";
import { createecosys } from "../../services/Atelier3Services/createEcosystemService";
import { updateecosys } from "../../services/Atelier3Services/updateEcosystemService"; // Add update service
import { deleteecosys } from "../../services/Atelier3Services/deleteEcosystemService"; // Add delete service
//partie prenante
import { getecoparties } from "../../services/Atelier3Services/getEcoPartiesService";
import { createpartie } from "../../services/Atelier3Services/createPartieService";
import { deletepartie } from "../../services/Atelier3Services/deletePartieService";
import { updatepartie } from "../../services/Atelier3Services/updatePartieService";
//scenario strategique
import { getsourcestrat } from "../../services/Atelier3Services/getSourceScenarioStratService";
import { createstrat } from "../../services/Atelier3Services/createScenarioStratService";
import { updatestrat } from "../../services/Atelier3Services/updateScenarioStratService";
import { deletestrat } from "../../services/Atelier3Services/deleteScenarioStratService";
//mesure securite
import { getscenariomesure } from "../../services/Atelier3Services/getScenarioMesureService";
import { updatemesure } from "../../services/Atelier3Services/updateMesureService";
import { deletemesure } from "../../services/Atelier3Services/deleteMesureService";
import { createmesure } from "../../services/Atelier3Services/createMesureService";
//source de risque
import { getappsource } from "../../services/Atelier2Services/getAppSourceService";
//mission
import { getappmissions } from "../../services/Atelier1Services/getAppMissionsService";
//evenement redoute
import { getvaleurevent } from "../../services/Atelier1Services/getValeurEventsService";
//valeur metier
import { getmissionvaleurmetier } from "../../services/Atelier1Services/getValeurMetierService"

const Atelier3: React.FC = () => {
  const [ecosystemes, setEcosystemes] = useState<Ecosysteme[]>([]);
  const [partiePrenants, setPartiePrenants] = useState<PartiePrenant[]>([]);
  const [strategiques, setStrategiques] = useState<CheminStrategique[]>([]);
  const [mesureSecurites, setMesureSecurites] = useState<
    MesureSecurite[]
  >([]);
  const [sourceRisques, setSourceRisques] = useState<SourceRisque[]>(
    []
  );
  const [evenements, setEvenements] = useState<EvenementRedoute[]>([]);
  const [parties,setParties]=useState<PartiePrenant[]>([]);


  const [selectedEcosystemes, setSelectedEcosystemes] = useState<Ecosysteme | null>(null);
  const [selectedPartiePrenant, setSelectedPartiePrenant] =
    useState<PartiePrenant | null>(null);
  const [selectedStrategique, setSelectedStrategique] =
    useState<CheminStrategique | null>(null);
    const [selectedMesureSecurite, setSelectedMesureSecurite] =
    useState<MesureSecurite | null>(null);
    const [selectedSourceRisque, setselectedSourceRisque] =
    useState<SourceRisque | null>(null);
    const [showBienEvent, setshowBienEvent] = useState(false);

  //=====================================================ecosysteme usestates=======================================
  const [isAddEcosystemeModalOpen, setAddEcosystemeModalOpen] = useState(false);
  const [newEcosystemeDescription, setNewEcosystemeDescription] = useState("");
  const [isUpdateEcosystemeModalOpen, setUpdateEcosystemeModalOpen] = useState(false); // Update modal state
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // Delete confirmation modal

  //==============================================partie prenantes usestates=======================================
  const [isAddPartieModalOpen, setAddPartieModalOpen] =
    useState(false);
  const [newPartieNom, setNewPartieNom] = useState("");
  const [newPartieActivite, setNewPartieActivite] = useState("");
  const [newPartieDepandance, setNewPartieDepandance] =
    useState(0);
  const [newPartiePenetration, setNewPartiePenetration] =
    useState(0);
  const [newPartieMaturite, setNewPartieMaturite] =
    useState(0);
  const [newPartieConfiance, setNewPartieConfiance] =
    useState(0);
  const [newPartieNiveauMenace, setnewPartieNiveauMenace] =
    useState(0);
  const [isDeletePartieConfirmationOpen, setDeletePartieConfirmationOpen] =
    useState(false); // Delete confirmation modal
  const [isUpdatePartieModalOpen, setUpdatePartieModalOpen] = useState(false); // Update modal state
  const [showViewPartieModal, setShowViewPartieModal] =
  useState<boolean>(false);
  
  //==============================================chemin strategique usestates=======================================
  const [isAddScenarioModalOpen, setAddScenarioModalOpen] = useState(false);
  const [newScenarioIntitul, setnewScenarioIntitul] = useState("");
  const [newScenarioDescription, setnewScenarioDescription] = useState("");
  const [newScenarioIdEvenementRedoute, setnewScenarioIdEvenementRedoute] = useState(0);
  const [newScenarioIdPartiePrenant, setnewScenarioIdPartiePrenant] = useState(0);
  const [newScenarioGravite, setnewScenarioGravite] = useState(0);
  const [isUpdateScenarioModalOpen, setUpdateScenarioModalOpen] = useState(false); // Update modal state
  const [isDeleteScenarioConfirmationOpen, setDeleteScenarioConfirmationOpen] =
    useState(false); // Delete confirmation modal
  const [showViewScenarioModal, setShowViewScenarioModal] =
    useState<boolean>(false);


  //==============================================mesure securite usestates===============================================
  const [isAddMesureModalOpen, setAddMesureModalOpen] =
    useState(false);
  const [newMesureMesure, setNewMesureMesure] = useState("");
  const [newMesureMenaceResiduel, setNewMesureMenaceResiduel] = useState(0);
  const [isDeleteMesureConfirmationOpen, setDeleteMesureConfirmationOpen] =
    useState(false); // Delete confirmation modal
  const [showViewMesureModal, setShowViewMesureModal] =
    useState<boolean>(false);
  const [isUpdateMesureModalOpen, setUpdateMesureModalOpen] = useState(false); // Update modal state

  //===========================================================================================================
  const navigate = useNavigate();
  const location = useLocation();
  const app = location.state?.app;

  useEffect(() => {
    if (app) {
      fetchData(app.id);
    }
  }, [app]);
  

  const fetchData = async (appId: number) => {
    try {
      const sourceResponse = await getappsource(appId);
      setSourceRisques(sourceResponse);
      const ecosystemeResponse = await getappecosys(appId);
      setEcosystemes(ecosystemeResponse);

      const missionResponse = await getappmissions(appId);
      // Fetch data for each mission
      const valeurResponses = await Promise.all(
       missionResponse.map((mission) => getmissionvaleurmetier(mission.id))
      );
      const flattenedValeurResponses = valeurResponses.flat();
      const evenementResponse = await Promise.all(
        flattenedValeurResponses.map((valeur : any) => {
          return getvaleurevent(valeur.id);
        })
      );
      const events = evenementResponse.flat().filter(event => event); // Supprime les éléments vides
      setEvenements(events);
    }
     catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //===================================================================================================

  const handleSelectSource = async (source: SourceRisque) => {
    if (selectedSourceRisque != null && selectedSourceRisque.id == source.id) {
      setselectedSourceRisque(null);
      setSelectedStrategique(null);
    } else {
      setSelectedStrategique(null);
      setSelectedEcosystemes(null);    
      setSelectedStrategique(null);
      setselectedSourceRisque(source);
      
      try {
        const strategiqueResponse = await getsourcestrat(source.id);
        setStrategiques(strategiqueResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSelectStrategique = async (scenario: CheminStrategique) => {
    if(selectedStrategique!= null && selectedStrategique.id == scenario.id){
      setSelectedStrategique(null);
    }else{
      try {
        setshowBienEvent(true);
        setSelectedStrategique(scenario);
        setSelectedMesureSecurite(null);
        const mesureResponse = await getscenariomesure(scenario.id);
        setMesureSecurites(mesureResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSelectEcosysteme = async (ecosysteme: Ecosysteme) => {
    if(selectedEcosystemes != null && selectedEcosystemes.id==ecosysteme.id){
      setSelectedEcosystemes(null);
      setshowBienEvent(false);
    }else{
      setshowBienEvent(false);
      setselectedSourceRisque(null);
      setSelectedMesureSecurite(null);
      setSelectedEcosystemes(ecosysteme);
      try {
        const partieResponse = await getecoparties(ecosysteme.id);
        setPartiePrenants(partieResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSelectedMesure = (mesure: MesureSecurite) => {
    if(selectedMesureSecurite != null && selectedMesureSecurite.id==mesure.id)
    {
      setSelectedMesureSecurite(null);
    }else{
      setSelectedMesureSecurite(mesure);
    }
  };

  const handleSelectPartie = (partie: PartiePrenant) => {
    if(selectedPartiePrenant != null && selectedPartiePrenant.id==partie.id)
    {
      setSelectedPartiePrenant(null);
    }else{
      setSelectedPartiePrenant(partie);
    }
  };

  const fetchPartie = async () => {
    try {
  
      const parResponses = await Promise.all(
        ecosystemes.map(async (eco) => {
          const response = await getecoparties(eco.id);
          return response;
        })
      );
  
      const flattenedParties = parResponses.flat();
  
      setParties(flattenedParties);
  
      // setTimeout(() => {
      //   console.log("Parties state after setting:", parties); // This may still show old state
      // }, 100);
    } catch (error) {
      console.error("Error fetching parties:", error);
    }
  };
  

  //==============================================ecosystemes functions========================================
  const handleAddEcosystemeClick = () => {
    setAddEcosystemeModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddEcosystemeModalOpen(false);
    setNewEcosystemeDescription("");
  };

  const handleCreateEcosysteme = async () => {
    if (!newEcosystemeDescription.trim() || !app) {
      alert("Please enter a valid ecosysteme description.");
      return;
    }

    try {
      const response = await createecosys(newEcosystemeDescription, app.id);

      if (response && response.status >= 200 && response.status < 300) {
        alert("Ecosysteme created successfully!");
        fetchData(app.id);
        handleCloseModal();
      } else {
        alert("Failed to create Ecosysteme. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Ecosysteme:", error);
      alert("Failed to create Ecosysteme.");
    }
  };

  // Update eco
  const handleUpdateEcosystemeClick = () => {
    if (!selectedEcosystemes) {
      alert("Please select a Ecosysteme");
    } else {
      setNewEcosystemeDescription(selectedEcosystemes.Description || "");
      setUpdateEcosystemeModalOpen(true);
    }
  };

  const handleUpdateEcosysteme = async () => {
    if (!newEcosystemeDescription.trim() || !selectedEcosystemes) {
      alert("Please enter a valid Ecosysteme description.");
      return;
    }

    try {
      const response = await updateecosys(
        selectedEcosystemes.id,
        newEcosystemeDescription
      );
      if (response && response.status >= 200 && response.status < 300) {
        alert("Ecosysteme updated successfully!");
        fetchData(app.id);
        setUpdateEcosystemeModalOpen(false);
      } else {
        alert("Failed to update Ecosysteme. Please try again.");
      }
    } catch (error) {
      console.error("Error updating Ecosysteme:", error);
      alert("Failed to update Ecosysteme.");
    }
  };

  // Delete eco
  const handleDeleteEcosystemeClick = () => {
    if (!selectedEcosystemes) {
      alert("Please select a Ecosysteme");
    } else {
      setDeleteConfirmationOpen(true);
    }
  };

  const handleDeleteEcosysteme = async () => {
    if (selectedEcosystemes) {
      try {
        const response = await deleteecosys(selectedEcosystemes.id);
        if (response && response.status >= 200 && response.status < 300) {
          alert("Ecosysteme deleted successfully!");
          fetchData(app.id);
          setDeleteConfirmationOpen(false);
        } else {
          alert("Failed to delete Ecosysteme. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting Ecosysteme:", error);
        alert("Failed to delete Ecosysteme.");
      }
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  //==============================================partie prenants functions========================================

  const handleOpenAddPartieModal = () => {
    setAddPartieModalOpen(true);
  };

  const handleCloseAddPartieModal = () => {
    setSelectedPartiePrenant(null);
    setAddPartieModalOpen(false);
    setNewPartieNom("");
    setNewPartieActivite("");
    setNewPartieConfiance(0);
    setNewPartieDepandance(0);
    setNewPartieMaturite(0);
    setNewPartiePenetration(0);
  };

  const handleCreatePartie = async () => {
    if (
      !newPartieNom.trim() ||
      !newPartieActivite.trim() ||
      !newPartieConfiance ||
      !newPartieDepandance ||
      !newPartieMaturite ||
      !newPartiePenetration ||
      !selectedEcosystemes
    ) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const response = await createpartie(
        newPartieNom,
        newPartieActivite,
        newPartieDepandance,
        newPartiePenetration,
        newPartieMaturite,
        newPartieConfiance,
        selectedEcosystemes.id
      );

      if (response && response.status >= 200 && response.status < 300) {
        if (selectedEcosystemes) handleSelectEcosysteme(selectedEcosystemes);
        alert("Partie prenante created successfully!");
        handleCloseAddPartieModal();
      } else {
        alert("Failed to create Partie prenante. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Partie prenante:", error);
      alert("Failed to create Partie prenante.");
    }
  };

  const handleViewPartie = () => {
    if (selectedPartiePrenant) {
      setNewPartieNom(selectedPartiePrenant.Nom);
      setNewPartieActivite(selectedPartiePrenant.Activite);
      setNewPartieConfiance(selectedPartiePrenant.Confiance);
      setNewPartieDepandance(selectedPartiePrenant.Depandance);
      setNewPartieMaturite(selectedPartiePrenant.Maturite);
      setNewPartiePenetration(selectedPartiePrenant.Penetration);
      setnewPartieNiveauMenace(selectedPartiePrenant.NiveauMenace);
      setShowViewPartieModal(true); // Show the view modal
    } else {
      alert("Please select an partie prenante to view.");
    }
  };

  const handleCloseViewPartieModal = () => {
    setShowViewPartieModal(false); // Reset all states when closing the modal
    setNewPartieNom("");
    setNewPartieActivite("");
    setNewPartieConfiance(0);
    setNewPartieDepandance(0);
    setNewPartieMaturite(0);
    setNewPartiePenetration(0);
    setnewPartieNiveauMenace(0);
    setSelectedPartiePrenant(null);
  };

  const handleOpenDeletePartieModal = () => {
    setDeletePartieConfirmationOpen(true);
  };

  const handleDeletePartie = async () => {
    if (selectedPartiePrenant) {
      try {
        const response = await deletepartie(selectedPartiePrenant.id);
        if (response && response.status >= 200 && response.status < 300) {
          if (selectedEcosystemes) handleSelectEcosysteme(selectedEcosystemes);
          alert("Partie prenante deleted successfully!");
          setDeletePartieConfirmationOpen(false);
        } else {
          alert("Failed to delete Partie prenante. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting Partie prenante:", error);
        alert("Failed to delete Partie prenante.");
      }
    }
  };

  const handleCloseDeletePartieConfirmation = () => {
    setDeletePartieConfirmationOpen(false);
  };

  const handleOpenUpdatePartieModal = () => {
    if (selectedPartiePrenant) {
        setNewPartieNom(selectedPartiePrenant.Nom);
        setNewPartieActivite(selectedPartiePrenant.Activite);
        setNewPartieConfiance(selectedPartiePrenant.Confiance);
        setNewPartieDepandance(selectedPartiePrenant.Depandance);
        setNewPartieMaturite(selectedPartiePrenant.Maturite);
        setNewPartiePenetration(selectedPartiePrenant.Penetration);
        setUpdatePartieModalOpen(true);
    }
  };

  const handleCloseUpdatePartieModal = () => {
    setUpdatePartieModalOpen(false);
    setNewPartieNom("");
    setNewPartieActivite("");
    setNewPartieConfiance(0);
    setNewPartieDepandance(0);
    setNewPartieMaturite(0);
    setNewPartiePenetration(0);
  };

  const handleUpdatePartie = async () => {
    if (selectedPartiePrenant && selectedEcosystemes) {
      try {
        const response = await updatepartie(
            newPartieNom,
            newPartieActivite,
            newPartieDepandance,
            newPartiePenetration,
            newPartieMaturite,
            newPartieConfiance,
            selectedPartiePrenant.id,
            selectedEcosystemes.id
        );

        if (response && response.status >= 200 && response.status < 300) {
          if (selectedEcosystemes) handleSelectEcosysteme(selectedEcosystemes);
          alert("Partie prenante created successfully!");
          handleCloseUpdatePartieModal();
        } else {
          alert("Failed to create Partie prenante. Please try again.");
        }
      } catch (error) {
        console.error("Error creating Partie prenante:", error);
        alert("Failed to create Partie prenante.");
      }
    }
  };

  //==============================================scenario strategique functions========================================

  const handleAddScenarioClick = async () => {
    console.log("Fetching parties before opening modal...");
    await fetchPartie(); // Ensure parties are fetched before opening the modal
    console.log("Parties after fetching:", parties);
    setnewScenarioIntitul("");
    setnewScenarioDescription("");
    setnewScenarioIdEvenementRedoute(0);
    setnewScenarioIdPartiePrenant(0);
    setnewScenarioGravite(0);
    setAddScenarioModalOpen(true);
  };

  const handleCloseAddScenarioModal = () => {
    setAddScenarioModalOpen(false);
    setnewScenarioIntitul("");
    setnewScenarioDescription("");
    setnewScenarioIdEvenementRedoute(0);
    setnewScenarioIdPartiePrenant(0);
    setnewScenarioGravite(0);
  };

  const handleCreateScenario = async () => {
    if (!newScenarioIntitul.trim() || 
        !newScenarioDescription.trim() ||
        !newScenarioIdEvenementRedoute ||
        !newScenarioIdPartiePrenant ||
        !newScenarioGravite ||
        !selectedSourceRisque) {
      alert("Please fill all the feilds.");
      return;
    }

    try {
      const response = await createstrat(newScenarioIntitul, newScenarioDescription, selectedSourceRisque.id, newScenarioIdEvenementRedoute, newScenarioIdPartiePrenant, newScenarioGravite);

      if (response && response.status >= 200 && response.status < 300) {
        alert("Scenario strategique created successfully!");
        fetchData(app.id);
        handleCloseAddScenarioModal();
      } else {
        alert("Failed to create Scenario strategique. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Scenario strategique:", error);
      alert("Failed to create Scenario strategique.");
    }
  };

  // Update Scenario
  const handleUpdateScenarioClick = () => {
    if (!selectedStrategique) {
      alert("please select a scenario strategique");
    } else {
      setnewScenarioIntitul(selectedStrategique.Intitul);
      setnewScenarioDescription(selectedStrategique.Description);
      setnewScenarioIdEvenementRedoute(selectedStrategique.IdEvenementRedoute);
      setnewScenarioIdPartiePrenant(selectedStrategique.IdPartiePrenant);
      setnewScenarioGravite(Number(selectedStrategique.Gravite));
      setUpdateScenarioModalOpen(true);
    }
  };

  const handleUpdateScenario = async () => {
    if (!newScenarioIntitul.trim() || 
        !newScenarioDescription.trim() ||
        !newScenarioIdEvenementRedoute ||
        !newScenarioIdPartiePrenant ||
        !newScenarioGravite ||
        !selectedSourceRisque ||
        !selectedStrategique
    ) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const response = await updatestrat(
        newScenarioIntitul, 
        newScenarioDescription,
        newScenarioIdEvenementRedoute, 
        newScenarioIdPartiePrenant, 
        newScenarioGravite,
        selectedStrategique.id
      );
      if (response && response.status >= 200 && response.status < 300) {
        alert("Scenario strategique updated successfully!");
        if (selectedSourceRisque) handleSelectSource(selectedSourceRisque);
        setUpdateScenarioModalOpen(false);
      } else {
        alert("Failed to update Scenario strategique. Please try again.");
      }
    } catch (error) {
      console.error("Error updating Scenario strategique:", error);
      alert("Failed to update Scenario strategique.");
    }
  };

  // Delete scenario
  const handleDeleteScenarioClick = () => {
    if (!selectedStrategique) {
      alert("please select a scenario strategique");
    } else {
      setDeleteScenarioConfirmationOpen(true);
    }
  };

  const handleDeleteScenario = async () => {
    if (selectedStrategique) {
      try {
        const response = await deletestrat(selectedStrategique.id);
        if (response && response.status >= 200 && response.status < 300) {
          alert("scenario strategique deleted successfully!");
          fetchData(app.id);
          setDeleteScenarioConfirmationOpen(false);
        } else {
          alert("Failed to delete scenario strategique. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting scenario strategique:", error);
        alert("Failed to delete scenario strategique.");
      }
    }
  };

  const handleCloseDeleteScenarioConfirmation = () => {
    setDeleteScenarioConfirmationOpen(false);
  };

  const handleViewScenario = () => {
    if (selectedStrategique) {
      setShowViewScenarioModal(true); // Show the view modal
    } else {
      alert("Please select an scenario startegique to view.");
    }
  };

  const handleCloseViewScenarioModal = () => {
    setShowViewScenarioModal(false); // Reset all states when closing the modal
  };

  //=============================================mesure de securite functions==============================================
  
  const handleOpenAddMesureModal = () => {
    setAddMesureModalOpen(true);
  };

  const handleCloseAddMesureModal = () => {
    setAddMesureModalOpen(false);
    setNewMesureMesure("");
    setNewMesureMenaceResiduel(0);
  };

  const handleCreateMesure = async () => {
    if (
      !newMesureMesure.trim() ||
      !newMesureMenaceResiduel ||
      !selectedStrategique
    ) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const response = await createmesure(
        newMesureMesure,
        newMesureMenaceResiduel,
        selectedStrategique.id
      );

      if (response && response.status >= 200 && response.status < 300) {
        if (selectedStrategique) handleSelectStrategique(selectedStrategique);
        alert("Mesure Securite created successfully!");
        handleCloseAddMesureModal();
      } else {
        alert("Failed to create Mesure Securite. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Mesure Securite:", error);
      alert("Failed to create Mesure Securite.");
    }
  };

  const handleViewMesure = () => {
    if (selectedMesureSecurite) {
      setShowViewMesureModal(true); // Show the view modal
    } else {
      alert("Please select an Mesure to view.");
    }
  };

  const handleCloseViewMesureModal = () => {
    setShowViewMesureModal(false); // Reset all states when closing the modal
  };

  const handleOpenDeleteMesureModal = () => {
    setDeleteMesureConfirmationOpen(true);
  };

  const handleDeleteMesure = async () => {
    if (selectedMesureSecurite) {
      try {
        const response = await deletemesure(selectedMesureSecurite.id);
        if (response && response.status >= 200 && response.status < 300) {
          if (selectedStrategique) handleSelectStrategique(selectedStrategique);
          alert("Mesure de securite deleted successfully!");
          setDeleteMesureConfirmationOpen(false);
        } else {
          alert("Failed to delete Mesure de securite. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting Mesure de securite:", error);
        alert("Failed to delete Mesure de securite.");
      }
    }
  };

  const handleCloseDeleteMesureConfirmation = () => {
    setDeleteMesureConfirmationOpen(false);
  };

  const handleOpenUpdateMesureModal = () => {
    if (selectedMesureSecurite) {
      setNewMesureMesure(selectedMesureSecurite.Mesure);
      setNewMesureMenaceResiduel(selectedMesureSecurite.MenaceResiduel);
      setUpdateMesureModalOpen(true);
    }
  };

  const handleCloseUpdateMesureModal = () => {
    setUpdateMesureModalOpen(false);
    setNewMesureMesure("");
    setNewMesureMenaceResiduel(0);
  };

  const handleUpdateMesure = async () => {
    if (selectedMesureSecurite) {
      try {
        const response = await updatemesure(
          newMesureMesure,
          newMesureMenaceResiduel,
          selectedMesureSecurite.id
        );

        if (response && response.status >= 200 && response.status < 300) {
          if (selectedStrategique) handleSelectStrategique(selectedStrategique);
          alert("Mesure de securite updated successfully!");
          handleCloseUpdateMesureModal();
        } else {
          alert("Failed to create Mesure de securite. Please try again.");
        }
      } catch (error) {
        console.error("Error creating Mesure de securite:", error);
        alert("Failed to create Mesure de securite.");
      }
    }
  };

  //==========================================================================================================
  return (
    <div className="atelier1-page" style={{ display: "flex", height: "100vh" }}>
      <div
        className="menu"
        style={{
          width: "20%",
          borderRight: "1px solid #ccc",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <h3>{app.name}</h3>
        <p>
          <strong>Created On:</strong>{" "}
          {new Date(app.dateofcreation).toLocaleDateString()}
        </p>

        <h4>Ecosystemes</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {ecosystemes.length > 0 ? (
            ecosystemes.map((ecosysteme) => (
              <li
                key={ecosysteme.id}
                onClick={() => handleSelectEcosysteme(ecosysteme)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedEcosystemes && selectedEcosystemes.id === ecosysteme.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
              >
                {ecosysteme.Description || `Ecosysteme ${ecosysteme.id}`}
              </li>
            ))
          ) : (
            <p>No ecosystemes available.</p>
          )}
        </ul>
        {/* Buttons for updating or deleting */}
        <div>
          <button
            onClick={handleAddEcosystemeClick}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Ecosysteme
          </button>
          <button
            onClick={handleUpdateEcosystemeClick}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "#ffc107",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Update
          </button>
          <button
            onClick={handleDeleteEcosystemeClick}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>

        <h4>Source de risque</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {sourceRisques.length > 0 ? (
            sourceRisques.map((source) => (
              <li
                key={source.id}
                onClick={() => handleSelectSource(source)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedSourceRisque &&
                    selectedSourceRisque.id === source.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
              >
                {source.Name || `Socle ${source.id}`}
              </li>
            ))
          ) : (
            <p>No Source de risque available.</p>
          )}
        </ul>
      </div>

      <div
        className="content"
        style={{
          flex: 1,
          padding: "20px",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        {selectedEcosystemes && !selectedSourceRisque && (
          <div>
            <h3>Ecosysteme: {selectedEcosystemes.Description}</h3>

            <h3>Parties prenantes</h3>
            {partiePrenants.map((partie) => (
              <div
                key={partie.id}
                onClick={() => handleSelectPartie(partie)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedPartiePrenant &&
                    selectedPartiePrenant.id === partie.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
              >
                <p>{partie.Nom}</p>
              </div>
            ))}

            <button onClick={() => handleViewPartie()}>
              View Partie prenante
            </button>
            <button onClick={handleOpenAddPartieModal}>
              Add Partie prenante
            </button>
            <button onClick={handleOpenUpdatePartieModal}>
              Update Partie prenante
            </button>
            <button onClick={handleOpenDeletePartieModal}>
              Delete Partie prenante
            </button>
          </div>
        )}

        {selectedSourceRisque && !selectedEcosystemes && (
          <div>
            <h3>Source de risque: {selectedSourceRisque.Name}</h3>
            <h4>Scenarios strategiques</h4>
            {strategiques.map((strat) => (
              <div 
              key={strat.id}
              onClick={() => handleSelectStrategique(strat)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedStrategique &&
                    selectedStrategique.id === strat.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
              >{strat.Intitul}</div>
            ))}

            <button onClick={() => handleViewScenario()}>
              View Scenario Strategique
            </button>
            <button onClick={handleAddScenarioClick}>
              Add Scenario strategique
            </button>
            <button onClick={handleUpdateScenarioClick}>
              Update Scenario strategique
            </button>
            <button onClick={handleDeleteScenarioClick}>
              Delete Scenario strategique
            </button>
          </div>
        )}

        {selectedStrategique && showBienEvent && (
          <div>
            <h3>Mesures de securites for Scenarios strategiques</h3>
            <h4>Mesures Securites</h4>
            {mesureSecurites.map((mesure) => (
                <div 
                key={mesure.id}
                onClick={() => handleSelectedMesure(mesure)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedMesureSecurite &&
                    selectedMesureSecurite.id === mesure.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
                >{mesure.Mesure}</div>
              ))}
            <button onClick={handleViewMesure}>
              View Mesure de securite
            </button> 
            <button onClick={handleOpenAddMesureModal}>
              Add Mesure de securite
            </button>
            <button onClick={handleOpenUpdateMesureModal}>
              Update Mesure de securite
            </button>
            <button onClick={handleOpenDeleteMesureModal}>
              Delete Mesure de securite
            </button>
          </div>
        )}
      </div>

      {/*======================================== ecosysteme modals ============================================*/}
      {isAddEcosystemeModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Add Ecosysteme</h3>
            <input
              type="text"
              placeholder="Ecosysteme description"
              value={newEcosystemeDescription}
              onChange={(e) => setNewEcosystemeDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleCreateEcosysteme}
                style={{ padding: "10px 20px" }}
              >
                Create
              </button>
              <button
                onClick={handleCloseModal}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Mission Modal */}
      {isUpdateEcosystemeModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Update Ecosysteme</h3>
            <input
              type="text"
              value={newEcosystemeDescription}
              onChange={(e) => setNewEcosystemeDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdateEcosysteme}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={() => setUpdateEcosystemeModalOpen(false)}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmationOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Are you sure you want to delete this exosysteme?</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleDeleteEcosysteme}
                style={{ padding: "10px 20px" }}
              >
                Yes
              </button>
              <button
                onClick={handleCloseDeleteConfirmation}
                style={{ padding: "10px 20px" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/*======================================== partie prenants modals ============================================*/}
      {isAddPartieModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Add Partie prenants</h3>
            <input
              type="text"
              placeholder="Name"
              value={newPartieNom}
              onChange={(e) => setNewPartieNom(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="text"
              placeholder="Activite"
              value={newPartieActivite}
              onChange={(e) => setNewPartieActivite(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="Dependance"
              value={newPartieDepandance}
              onChange={(e) => setNewPartieDepandance(Number(e.target.value))}
              min={1}
              max={4}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="Penetration"
              value={newPartiePenetration}
              onChange={(e) => setNewPartiePenetration(Number(e.target.value))}
              min={1}
              max={4}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="Maturite"
              value={newPartieMaturite}
              onChange={(e) => setNewPartieMaturite(Number(e.target.value))}
              min={1}
              max={4}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="Confiance"
              value={newPartieConfiance}
              onChange={(e) => setNewPartieConfiance(Number(e.target.value))}
              min={1}
              max={4}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleCreatePartie}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={handleCloseAddPartieModal}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewPartieModal && selectedPartiePrenant && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h3>Partie prenante Details</h3>
            <p>
              <strong>Nom:</strong> {selectedPartiePrenant.Nom}
            </p>
            <p>
              <strong>Activite:</strong> {selectedPartiePrenant.Activite}
            </p>
            <p>
              <strong>Dependance:</strong> {selectedPartiePrenant.Depandance}
            </p>
            <p>
              <strong>Penetration:</strong> {selectedPartiePrenant.Penetration}
            </p>
            <p>
              <strong>Maturite:</strong> {selectedPartiePrenant.Maturite}
            </p>
            <p>
              <strong>Confiance:</strong> {selectedPartiePrenant.Confiance}
            </p>
            <p>
              <strong>Niveau de menace:</strong> {selectedPartiePrenant.NiveauMenace}
            </p>
            <button
              onClick={handleCloseViewPartieModal}
              style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeletePartieConfirmationOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Are you sure you want to delete this Partie prenante?</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleDeletePartie}
                style={{ padding: "10px 20px" }}
              >
                Yes
              </button>
              <button
                onClick={handleCloseDeletePartieConfirmation}
                style={{ padding: "10px 20px" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdatePartieModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Update Partie prenante</h3>
            <input
              type="text"
              placeholder="Name"
              value={newPartieNom}
              onChange={(e) => setNewPartieNom(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="text"
              placeholder="Activite"
              value={newPartieActivite}
              onChange={(e) => setNewPartieActivite(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="Dependance"
              value={newPartieDepandance}
              onChange={(e) => setNewPartieDepandance(Number(e.target.value))}
              min={1}
              max={4}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="Penetration"
              value={newPartiePenetration}
              onChange={(e) => setNewPartiePenetration(Number(e.target.value))}
              min={1}
              max={4}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="Maturite"
              value={newPartieMaturite}
              onChange={(e) => setNewPartieMaturite(Number(e.target.value))}
              min={1}
              max={4}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="Confiance"
              value={newPartieConfiance}
              onChange={(e) => setNewPartieConfiance(Number(e.target.value))}
              min={1}
              max={4}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdatePartie}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={handleCloseUpdatePartieModal}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/*======================================== scenario strategique modals ============================================*/}
      {isAddScenarioModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Add Scenario strategique</h3>
            <input
              type="text"
              placeholder="Intitule"
              value={newScenarioIntitul}
              onChange={(e) => setnewScenarioIntitul(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="Description"
              value={newScenarioDescription}
              onChange={(e) => setnewScenarioDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <select
              value={newScenarioIdEvenementRedoute}
              onChange={(e) =>setnewScenarioIdEvenementRedoute(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            >
              <option value="">Select an option</option> {/* Placeholder option */}
              {evenements.map((evenement) => (
              <option key={evenement.id} value={evenement.id}>
                {evenement.Name}
              </option>
              ))}
            </select>
            <select
              value={newScenarioIdPartiePrenant}
              onChange={(e) =>setnewScenarioIdPartiePrenant(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            >
              <option value="">Select an option</option> {/* Placeholder option */}
              {parties.map((partie) => (
              <option key={partie.id} value={partie.id}>
                {partie.Nom}
              </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Gravite"
              value={newScenarioGravite}
              onChange={(e) => setnewScenarioGravite(Number(e.target.value))}
              min={1}
              max={4}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleCreateScenario}
                style={{ padding: "10px 20px" }}
              >
                Create
              </button>
              <button
                onClick={handleCloseAddScenarioModal}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update socle de securite  Modal */}
      {isUpdateScenarioModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Update Scenario strategique</h3>
            <input
              type="text"
              placeholder="Intitule"
              value={newScenarioIntitul}
              onChange={(e) => setnewScenarioIntitul(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="Description"
              value={newScenarioDescription}
              onChange={(e) => setnewScenarioDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <select
              value={newScenarioIdEvenementRedoute}
              onChange={(e) =>setnewScenarioIdEvenementRedoute(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            >
              <option value="">Select an option</option> {/* Placeholder option */}
              {evenements.map((evenement) => (
              <option key={evenement.id} value={evenement.id}>
                {evenement.Name}
              </option>
              ))}
            </select>
            <select
              value={newScenarioIdPartiePrenant}
              onChange={(e) =>setnewScenarioIdPartiePrenant(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            >
              <option value="">Select an option</option> {/* Placeholder option */}
              {partiePrenants.map((partie) => (
              <option key={partie.id} value={partie.id}>
                {partie.Nom}
              </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Gravite"
              value={newScenarioGravite}
              onChange={(e) => setnewScenarioGravite(Number(e.target.value))}
              min={1}
              max={4}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdateScenario}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={() => setUpdateScenarioModalOpen(false)}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete socle de securite  Modal */}
      {isDeleteScenarioConfirmationOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Are you sure you want to delete this Scenario strategique?</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleDeleteScenario}
                style={{ padding: "10px 20px" }}
              >
                Yes
              </button>
              <button
                onClick={handleCloseDeleteScenarioConfirmation}
                style={{ padding: "10px 20px" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

        {showViewScenarioModal && selectedStrategique && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h3>Scenario strategique Details</h3>
            <p>
              <strong>Intitule:</strong> {selectedStrategique.Intitul}
            </p>
            <p>
              <strong>Description:</strong> {selectedStrategique.Description}
            </p>
            <p>
              <strong>Gravite:</strong> {selectedStrategique.Gravite}
            </p>
            <button
              onClick={handleCloseViewScenarioModal}
              style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/*======================================== mesure modals ============================================*/}
      {isAddMesureModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Add Mesure</h3>
            <textarea
              placeholder="Mesure"
              value={newMesureMesure}
              onChange={(e) => setNewMesureMesure(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="number"
              placeholder="Menace residuel"
              value={newMesureMenaceResiduel}
              onChange={(e) => setNewMesureMenaceResiduel(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleCreateMesure}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={handleCloseAddMesureModal}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewMesureModal && selectedMesureSecurite && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h3>Mesure de securite Details</h3>
            <p>
              <strong>Mesure:</strong> {selectedMesureSecurite.Mesure}
            </p>
            <p>
              <strong>Menace residuel:</strong> {selectedMesureSecurite.MenaceResiduel}
            </p>
            <button
              onClick={handleCloseViewMesureModal}
              style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteMesureConfirmationOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Are you sure you want to delete this Mesure de securite?</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleDeleteMesure}
                style={{ padding: "10px 20px" }}
              >
                Yes
              </button>
              <button
                onClick={handleCloseDeleteMesureConfirmation}
                style={{ padding: "10px 20px" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdateMesureModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>Update Mesure</h3>
            <input
              type="text"
              value={newMesureMesure}
              onChange={(e) => setNewMesureMesure(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              value={newMesureMenaceResiduel}
              onChange={(e) => setNewMesureMenaceResiduel(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdateMesure}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={handleCloseUpdateMesureModal}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Atelier3;
