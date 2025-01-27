import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mission } from "../../interfaces/mission";
import { ValeurMetier } from "../../interfaces/valeurMetier";
import { BienSupport } from "../../interfaces/biensupport";
import { EvenementRedoute } from "../../interfaces/evenementRedoute";
import { SocleDeSecurite } from "../../interfaces/socleDeSecurite";
import { Ecart } from "../../interfaces/ecart";
//mission
import { getappmissions } from "../../services/Atelier1Services/getAppMissionsService";
import { createmission } from "../../services/Atelier1Services/createMissionService";
import { updatemission } from "../../services/Atelier1Services/updateMissionService"; // Add update service
import { deletemission } from "../../services/Atelier1Services/deleteMissionService"; // Add delete service
//valeur metier
import { getmissionvaleurmetier } from "../../services/Atelier1Services/getValeurMetierService";
import { addValeurMetier } from "../../services/Atelier1Services/createValeurMetierService";
import { deletevaleurmetier } from "../../services/Atelier1Services/deleteValeurMetierService";
import { updateValeurMetier } from "../../services/Atelier1Services/updateValeurMetierService";
//socle de securite
import { getappsocle } from "../../services/Atelier1Services/getAppSocleService";
import { createsocle } from "../../services/Atelier1Services/createSocleSecService";
import { updatesocle } from "../../services/Atelier1Services/updateSocleSecService";
import { deletesocle } from "../../services/Atelier1Services/deleteSocleSecService";
//ecarts
import { getsocleecart } from "../../services/Atelier1Services/getSocleEcartService";
import { updateecart } from "../../services/Atelier1Services/updateEcartService";
import { deleteecart } from "../../services/Atelier1Services/deleteEcartService";
import { createecart } from "../../services/Atelier1Services/createEcartService";
//evenements redoute
import { getvaleurevent } from "../../services/Atelier1Services/getValeurEventsService";
import { updateevent } from "../../services/Atelier1Services/updateEventService";
import { deleteevent } from "../../services/Atelier1Services/deleteEventService";
import { createevent } from "../../services/Atelier1Services/createEventService";
//bien support
import { getvaleurbien } from "../../services/Atelier1Services/getValeurBienService";
import { updatebien } from "../../services/Atelier1Services/updateBienService";
import { deletebien } from "../../services/Atelier1Services/deleteBienService";
import { createbien } from "../../services/Atelier1Services/createBienService";

const Atelier1: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [valeursMetier, setValeursMetier] = useState<ValeurMetier[]>([]);
  const [bienSupports, setBienSupports] = useState<BienSupport[]>([]);
  const [evenementsRedoutes, setEvenementsRedoutes] = useState<
    EvenementRedoute[]
  >([]);
  const [soclesDeSecurite, setSoclesDeSecurite] = useState<SocleDeSecurite[]>(
    []
  );
  const [ecarts, setEcarts] = useState<Ecart[]>([]);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [selectedValeurMetier, setSelectedValeurMetier] =
    useState<ValeurMetier | null>(null);
  const [selectedSocleDeSecurite, setSelectedSocleDeSecurite] =
    useState<SocleDeSecurite | null>(null);
    const [selectedEcart, setSelectedEcart] =
    useState<Ecart | null>(null);
    const [selectedEvent, setselectedEvent] =
    useState<EvenementRedoute | null>(null);
    const [selectedBien, setselectedBien] =
    useState<BienSupport | null>(null);
    const [showBienEvent, setshowBienEvent] = useState(false);

  //=====================================================mission usestates=======================================
  const [isAddMissionModalOpen, setAddMissionModalOpen] = useState(false);
  const [newMissionDescription, setNewMissionDescription] = useState("");
  const [isUpdateMissionModalOpen, setUpdateMissionModalOpen] = useState(false); // Update modal state
  const [updatedMissionDescription, setUpdatedMissionDescription] =
    useState(""); // Updated description
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // Delete confirmation modal

  //==============================================valeur metier usestates=======================================
  const [isAddValeurMetierModalOpen, setAddValeurMetierModalOpen] =
    useState(false);
  const [newValeurMetierName, setNewValeurMetierName] = useState("");
  const [newValeurMetierNature, setNewValeurMetierNature] = useState<
    "Processus" | "Information"
  >("Processus");
  const [newValeurMetierDescription, setNewValeurMetierDescription] =
    useState("");
  const [newEntiteResponsable, setNewEntiteResponsable] = useState("");
  const [isDeleteValeurConfirmationOpen, setDeleteValeurConfirmationOpen] =
    useState(false); // Delete confirmation modal
  const [isUpdateValeurModalOpen, setUpdateValeurModalOpen] = useState(false); // Update modal state
  const [showViewValeurModal, setShowViewValeurModal] =
  useState<boolean>(false);
  
  //==============================================Socle de securite usestates=======================================
  const [isAddSocleModalOpen, setAddSocleModalOpen] = useState(false);
  const [newSocleName, setnewSocleName] = useState("");
  const [isUpdateSocleModalOpen, setUpdateSocleModalOpen] = useState(false); // Update modal state
  const [isDeleteSocleConfirmationOpen, setDeleteSocleConfirmationOpen] =
    useState(false); // Delete confirmation modal


  //==============================================Ecart usestates===============================================
  const [isAddEcartModalOpen, setAddEcartModalOpen] =
    useState(false);
  const [newEcartType, setNewEcartType] = useState("");
  const [newEcartJustification, setNewEcartJustification] = useState("");
  const [isDeleteEcartConfirmationOpen, setDeleteEcartConfirmationOpen] =
    useState(false); // Delete confirmation modal
  const [showViewEcartModal, setShowViewEcartModal] =
    useState<boolean>(false);
  const [isUpdateEcartModalOpen, setUpdateEcartModalOpen] = useState(false); // Update modal state

  //==============================================Evenement redoute usestates=======================================
  const [isAddEventModalOpen, setAddEventModalOpen] =
    useState(false);
  const [newEventName, setNewEventName] = useState("");
  const [newEventDescription, setNewEventDescription] =
    useState("");
  const [newEventType, setNewEventType] = useState("");
  const [newEventConsequence, setNewEventConsequence] = useState("");
  const [isDeleteEventConfirmationOpen, setDeleteEventConfirmationOpen] =
    useState(false); // Delete confirmation modal
  const [isUpdateEventModalOpen, setUpdateEventModalOpen] = useState(false); // Update modal state
  const [showViewEventModal, setShowViewEventModal] =
  useState<boolean>(false);

  //==============================================Bien usestates=======================================
  const [isAddBienModalOpen, setAddBienModalOpen] =
    useState(false);
  const [newBienName, setNewBienName] = useState("");
  const [isDeleteBienConfirmationOpen, setDeleteBienConfirmationOpen] =
    useState(false); // Delete confirmation modal
  const [isUpdateBienModalOpen, setUpdateBienModalOpen] = useState(false); // Update modal state

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
      const missionResponse = await getappmissions(appId);
      setMissions(missionResponse);
      const socleResponse = await getappsocle(appId);
      setSoclesDeSecurite(socleResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //===================================================================================================

  const handleSelectMission = async (mission: Mission) => {
    if (selectedMission != null && selectedMission.id == mission.id) {
      setSelectedMission(null);
    } else {
      setSelectedValeurMetier(null);
      setSelectedSocleDeSecurite(null);
      setSelectedMission(mission);
      
      try {
        const valeurMetierResponse = await getmissionvaleurmetier(mission.id);
        setValeursMetier(valeurMetierResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSelectValeurMetier = async (valeurMetier: ValeurMetier) => {
    if(selectedValeurMetier!= null && selectedValeurMetier.id == valeurMetier.id){
      setSelectedValeurMetier(null);
    }else{
      try {
        setshowBienEvent(true);
        setSelectedValeurMetier(valeurMetier);
        setselectedBien(null);
        setselectedEvent(null);
        const bienResponse = await getvaleurbien(valeurMetier.id);
        setBienSupports(bienResponse);
        const eventResponse = await getvaleurevent(valeurMetier.id);
        setEvenementsRedoutes(eventResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSelectSocleDeSecurite = async (socle: SocleDeSecurite) => {
    if(selectedSocleDeSecurite != null && selectedSocleDeSecurite.id==socle.id){
      setSelectedSocleDeSecurite(null);
      setshowBienEvent(false);
    }else{
      setshowBienEvent(false);
      setSelectedMission(null);
      setSelectedEcart(null);
      setSelectedSocleDeSecurite(socle);
      try {
        const ecartResponse = await getsocleecart(socle.id);
        setEcarts(ecartResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleSelectedEcart = (ecart: Ecart) => {
    if(selectedEcart != null && selectedEcart.id==ecart.id)
    {
      setSelectedEcart(null);
    }else{
      setSelectedEcart(ecart);
    }
  };

  const handleSelectedBien = (bien: BienSupport) => {
    if(selectedBien != null && selectedBien.id==bien.id)
    {
      setselectedBien(null);
    }else{
      setselectedBien(bien);
    }
  };

  const handleSelectedEvent = (event: EvenementRedoute) => {
    if(selectedEvent != null && selectedEvent.id==event.id)
    {
      setselectedEvent(null);
    }else{
      setselectedEvent(event);
    }
  };

  //==============================================Mission functions========================================
  const handleAddMissionClick = () => {
    setAddMissionModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddMissionModalOpen(false);
    setNewMissionDescription("");
  };

  const handleCreateMission = async () => {
    if (!newMissionDescription.trim() || !app) {
      alert("Please enter a valid mission description.");
      return;
    }

    try {
      const response = await createmission(newMissionDescription, app.id);

      if (response && response.status >= 200 && response.status < 300) {
        alert("Mission created successfully!");
        fetchData(app.id);
        handleCloseModal();
      } else {
        alert("Failed to create mission. Please try again.");
      }
    } catch (error) {
      console.error("Error creating mission:", error);
      alert("Failed to create mission.");
    }
  };

  // Update Mission
  const handleUpdateMissionClick = () => {
    if (!selectedMission) {
      alert("Please select a mission");
    } else {
      setUpdatedMissionDescription(selectedMission.description || "");
      setUpdateMissionModalOpen(true);
    }
  };

  const handleUpdateMission = async () => {
    if (!updatedMissionDescription.trim() || !selectedMission) {
      alert("Please enter a valid mission description.");
      return;
    }

    try {
      const response = await updatemission(
        selectedMission.id,
        updatedMissionDescription
      );
      if (response && response.status >= 200 && response.status < 300) {
        alert("Mission updated successfully!");
        fetchData(app.id);
        setUpdateMissionModalOpen(false);
      } else {
        alert("Failed to update mission. Please try again.");
      }
    } catch (error) {
      console.error("Error updating mission:", error);
      alert("Failed to update mission.");
    }
  };

  // Delete Mission
  const handleDeleteMissionClick = () => {
    if (!selectedMission) {
      alert("Please select a mission");
    } else {
      setDeleteConfirmationOpen(true);
    }
  };

  const handleDeleteMission = async () => {
    if (selectedMission) {
      try {
        const response = await deletemission(selectedMission.id);
        if (response && response.status >= 200 && response.status < 300) {
          alert("Mission deleted successfully!");
          fetchData(app.id);
          setDeleteConfirmationOpen(false);
        } else {
          alert("Failed to delete mission. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting mission:", error);
        alert("Failed to delete mission.");
      }
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  //==============================================valeu metier functions========================================

  const handleOpenAddValeurMetierModal = () => {
    setAddValeurMetierModalOpen(true);
  };

  const handleCloseAddValeurMetierModal = () => {
    setAddValeurMetierModalOpen(false);
    setNewValeurMetierName("");
    setNewValeurMetierNature("Processus");
    setNewValeurMetierDescription("");
    setNewEntiteResponsable("");
  };

  const handleCreateValeurMetier = async () => {
    if (
      !newValeurMetierName.trim() ||
      !newValeurMetierDescription.trim() ||
      !newEntiteResponsable.trim() ||
      !selectedMission
    ) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const response = await addValeurMetier(
        newValeurMetierName,
        newValeurMetierNature,
        newValeurMetierDescription,
        newEntiteResponsable,
        selectedMission.id
      );

      if (response && response.status >= 200 && response.status < 300) {
        if (selectedMission) handleSelectMission(selectedMission);
        alert("Valeur Metier created successfully!");
        handleCloseAddValeurMetierModal();
      } else {
        alert("Failed to create Valeur Metier. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Valeur Metier:", error);
      alert("Failed to create Valeur Metier.");
    }
  };

  const handleViewValeurMetier = () => {
    if (selectedValeurMetier) {
      setShowViewValeurModal(true); // Show the view modal
    } else {
      alert("Please select an valeur metier to view.");
    }
  };

  const handleCloseViewValeurModal = () => {
    setShowViewValeurModal(false); // Reset all states when closing the modal
  };

  const handleOpenDeleteValeurMetierModal = () => {
    setDeleteValeurConfirmationOpen(true);
  };

  const handleDeleteValeur = async () => {
    if (selectedValeurMetier) {
      try {
        const response = await deletevaleurmetier(selectedValeurMetier.id);
        if (response && response.status >= 200 && response.status < 300) {
          if (selectedMission) handleSelectMission(selectedMission);
          alert("Valeur Metier deleted successfully!");
          setDeleteValeurConfirmationOpen(false);
        } else {
          alert("Failed to delete valeur metier. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting valeur metier:", error);
        alert("Failed to delete valeur metier.");
      }
    }
  };

  const handleCloseDeleteValeurConfirmation = () => {
    setDeleteValeurConfirmationOpen(false);
  };

  const handleOpenUpdateValeurMetierModal = () => {
    if (selectedValeurMetier) {
      setNewValeurMetierName(selectedValeurMetier.Nom);
      setNewValeurMetierDescription(selectedValeurMetier.Description);
      setNewEntiteResponsable(selectedValeurMetier.EntiteResponsable);
      setNewValeurMetierNature(selectedValeurMetier.Nature);
      setUpdateValeurModalOpen(true);
    }
  };

  const handleCloseUpdateValeurMetierModal = () => {
    setUpdateValeurModalOpen(false);
    setNewValeurMetierName("");
    setNewValeurMetierNature("Processus");
    setNewValeurMetierDescription("");
    setNewEntiteResponsable("");
  };

  const handleUpdateValeur = async () => {
    if (selectedValeurMetier) {
      try {
        const response = await updateValeurMetier(
          newValeurMetierName,
          newValeurMetierNature,
          newValeurMetierDescription,
          newEntiteResponsable,
          selectedValeurMetier.id
        );

        if (response && response.status >= 200 && response.status < 300) {
          if (selectedMission) handleSelectMission(selectedMission);
          alert("Valeur Metier created successfully!");
          handleCloseUpdateValeurMetierModal();
        } else {
          alert("Failed to create Valeur Metier. Please try again.");
        }
      } catch (error) {
        console.error("Error creating Valeur Metier:", error);
        alert("Failed to create Valeur Metier.");
      }
    }
  };

  //==============================================socle de securite functions========================================

  const handleAddSocleClick = () => {
    setnewSocleName("");
    setAddSocleModalOpen(true);
  };

  const handleCloseAddSocleModal = () => {
    setAddSocleModalOpen(false);
    setnewSocleName("");
  };

  const handleCreateSocle = async () => {
    if (!newSocleName.trim() || !app) {
      alert("Please enter a valid socle de securite name.");
      return;
    }

    try {
      const response = await createsocle(newSocleName, app.id);

      if (response && response.status >= 200 && response.status < 300) {
        alert("Socle de securite created successfully!");
        fetchData(app.id);
        handleCloseAddSocleModal();
      } else {
        alert("Failed to create Socle de securite. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Socle de securite:", error);
      alert("Failed to create Socle de securite.");
    }
  };

  // Update Socle de securite
  const handleUpdateSocleClick = () => {
    if (!selectedSocleDeSecurite) {
      alert("please select a socle de securite");
    } else {
      setnewSocleName(selectedSocleDeSecurite.Name || "");
      setUpdateSocleModalOpen(true);
    }
  };

  const handleUpdateSocle = async () => {
    if (!newSocleName.trim() || !selectedSocleDeSecurite) {
      alert("Please enter a valid socle de securite name.");
      return;
    }

    try {
      const response = await updatesocle(
        selectedSocleDeSecurite.id,
        newSocleName
      );
      if (response && response.status >= 200 && response.status < 300) {
        alert("Socle de securite updated successfully!");
        fetchData(app.id);
        setUpdateSocleModalOpen(false);
      } else {
        alert("Failed to update Socle de securite. Please try again.");
      }
    } catch (error) {
      console.error("Error updating Socle de securite:", error);
      alert("Failed to update Socle de securite.");
    }
  };

  // Delete Socle de securite
  const handleDeleteSocleClick = () => {
    if (!selectedSocleDeSecurite) {
      alert("please select a socle de securite");
    } else {
      setDeleteSocleConfirmationOpen(true);
    }
  };

  const handleDeleteSocle = async () => {
    if (selectedSocleDeSecurite) {
      try {
        const response = await deletesocle(selectedSocleDeSecurite.id);
        if (response && response.status >= 200 && response.status < 300) {
          alert("Socle de securite deleted successfully!");
          fetchData(app.id);
          setDeleteSocleConfirmationOpen(false);
        } else {
          alert("Failed to delete Socle de securite. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting Socle de securite:", error);
        alert("Failed to delete Socle de securite.");
      }
    }
  };

  const handleCloseDeleteSocleConfirmation = () => {
    setDeleteSocleConfirmationOpen(false);
  };

  //=============================================Ecart functions==============================================
  
  const handleOpenAddEcartModal = () => {
    setAddEcartModalOpen(true);
  };

  const handleCloseAddEcartModal = () => {
    setAddEcartModalOpen(false);
    setNewEcartType("");
    setNewEcartJustification("");
  };

  const handleCreateEcart = async () => {
    if (
      !newEcartType.trim() ||
      !newEcartJustification.trim() ||
      !selectedSocleDeSecurite
    ) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const response = await createecart(
        newEcartType,
        newEcartJustification,
        selectedSocleDeSecurite.id
      );

      if (response && response.status >= 200 && response.status < 300) {
        if (selectedSocleDeSecurite) handleSelectSocleDeSecurite(selectedSocleDeSecurite);
        alert("Ecart created successfully!");
        handleCloseAddEcartModal();
      } else {
        alert("Failed to create Ecart. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Ecart:", error);
      alert("Failed to create Ecart.");
    }
  };

  const handleViewEcart = () => {
    if (selectedEcart) {
      setShowViewEcartModal(true); // Show the view modal
    } else {
      alert("Please select an Ecart to view.");
    }
  };

  const handleCloseViewEcartModal = () => {
    setShowViewEcartModal(false); // Reset all states when closing the modal
  };

  const handleOpenDeleteEcartModal = () => {
    setDeleteEcartConfirmationOpen(true);
  };

  const handleDeleteEcart = async () => {
    if (selectedEcart) {
      try {
        const response = await deleteecart(selectedEcart.id);
        if (response && response.status >= 200 && response.status < 300) {
          if (selectedSocleDeSecurite) handleSelectSocleDeSecurite(selectedSocleDeSecurite);
          alert("Ecart deleted successfully!");
          setDeleteEcartConfirmationOpen(false);
        } else {
          alert("Failed to delete Ecart. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting Ecart:", error);
        alert("Failed to delete Ecart.");
      }
    }
  };

  const handleCloseDeleteEcartConfirmation = () => {
    setDeleteEcartConfirmationOpen(false);
  };

  const handleOpenUpdateEcartModal = () => {
    if (selectedEcart) {
      setNewEcartType(selectedEcart.TypeEcart);
      setNewEcartJustification(selectedEcart.Justification);
      setUpdateEcartModalOpen(true);
    }
  };

  const handleCloseUpdateEcartModal = () => {
    setUpdateEcartModalOpen(false);
    setNewEcartType("");
    setNewEcartJustification("");
  };

  const handleUpdateEcart = async () => {
    if (selectedEcart) {
      try {
        const response = await updateecart(
          selectedEcart.id,
          newEcartType,
          newEcartJustification,
        );

        if (response && response.status >= 200 && response.status < 300) {
          if (selectedSocleDeSecurite) handleSelectSocleDeSecurite(selectedSocleDeSecurite);
          alert("Ecart updated successfully!");
          handleCloseUpdateEcartModal();
        } else {
          alert("Failed to create Ecart. Please try again.");
        }
      } catch (error) {
        console.error("Error creating Ecart:", error);
        alert("Failed to create Ecart.");
      }
    }
  };

  //==============================================Bien support==================================================

  const handleAddBienClick = () => {
    setNewBienName("");
    setAddBienModalOpen(true);
  };

  const handleCloseAddBienModal = () => {
    setAddBienModalOpen(false);
    setNewBienName("");
  };

  const handleCreateBien = async () => {
    if (!newBienName.trim() || !selectedValeurMetier) {
      alert("Please enter a valid Bien support name.");
      return;
    }

    try {
      const response = await createbien(newBienName, selectedValeurMetier.id);

      if (response && response.status >= 200 && response.status < 300) {
        alert("Bien support created successfully!");
        if (selectedValeurMetier) handleSelectValeurMetier(selectedValeurMetier);
        handleCloseAddBienModal();
      } else {
        alert("Failed to create Bien support. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Bien support:", error);
      alert("Failed to create Bien support.");
    }
  };

  const handleUpdateBienClick = () => {
    if (!selectedBien) {
      alert("please select a Bien support");
    } else {
      setNewBienName(selectedBien.Name || "");
      setUpdateBienModalOpen(true);
    }
  };

  const handleUpdateBien = async () => {
    if (!newBienName.trim() || !selectedBien) {
      alert("Please enter a valid Bien support name.");
      return;
    }

    try {
      const response = await updatebien(
        newBienName,
        selectedBien.id,
      );
      if (response && response.status >= 200 && response.status < 300) {
        alert("Bien support updated successfully!");
        if (selectedValeurMetier) handleSelectValeurMetier(selectedValeurMetier);
        setUpdateBienModalOpen(false);
      } else {
        alert("Failed to update Bien support. Please try again.");
      }
    } catch (error) {
      console.error("Error updating Bien support:", error);
      alert("Failed to update Bien support.");
    }
  };

  // Delete Socle de securite
  const handleDeleteBienClick = () => {
    if (!selectedBien) {
      alert("please select a Bien support");
    } else {
      setDeleteBienConfirmationOpen(true);
    }
  };

  const handleDeleteBien = async () => {
    if (selectedBien) {
      try {
        const response = await deletebien(selectedBien.id);
        if (response && response.status >= 200 && response.status < 300) {
          alert("Bien support deleted successfully!");
          if (selectedValeurMetier) handleSelectValeurMetier(selectedValeurMetier);
          setDeleteBienConfirmationOpen(false);
        } else {
          alert("Failed to delete Bien support. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting Bien support:", error);
        alert("Failed to delete Bien support.");
      }
    }
  };

  const handleCloseDeleteBienConfirmation = () => {
    setDeleteBienConfirmationOpen(false);
  };
  //==============================================Evenement redoute functions========================================

  const handleOpenAddEventModal = () => {
    setAddEventModalOpen(true);
  };

  const handleCloseAddEventModal = () => {
    setAddEventModalOpen(false);
    setNewEventName("");
    setNewEventDescription("");
    setNewEventType("");
    setNewEventConsequence("");
  };

  const handleCreateEvent = async () => {
    if (
      !newEventName.trim() ||
      !newEventDescription.trim() ||
      !newEventType.trim() ||
      !newEventConsequence.trim() ||
      !selectedValeurMetier
    ) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const response = await createevent(
        newEventName,
        newEventDescription,
        newEventType,
        newEventConsequence,
        selectedValeurMetier.id
      );

      if (response && response.status >= 200 && response.status < 300) {
        if (selectedValeurMetier) handleSelectValeurMetier(selectedValeurMetier);
        alert("Evenement redoute created successfully!");
        handleCloseAddEventModal();
      } else {
        alert("Failed to create Evenement redoute. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Evenement redoute:", error);
      alert("Failed to create Evenement redoute.");
    }
  };

  const handleViewEvent = () => {
    if (selectedEvent) {
      setShowViewEventModal(true); // Show the view modal
    } else {
      alert("Please select an Evenement redoute to view.");
    }
  };

  const handleCloseViewEventModal = () => {
    setShowViewEventModal(false); // Reset all states when closing the modal
  };

  const handleOpenDeleteEventModal = () => {
    setDeleteEventConfirmationOpen(true);
  };

  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        const response = await deleteevent(selectedEvent.id);
        if (response && response.status >= 200 && response.status < 300) {
          if (selectedValeurMetier) handleSelectValeurMetier(selectedValeurMetier);
          alert("Evenement redoute deleted successfully!");
          setDeleteEventConfirmationOpen(false);
        } else {
          alert("Failed to delete Evenement redoute. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting Evenement redoute:", error);
        alert("Failed to delete Evenement redoute.");
      }
    }
  };

  const handleCloseDeleteEventConfirmation = () => {
    setDeleteEventConfirmationOpen(false);
  };

  const handleOpenUpdateEventModal = () => {
    if (selectedEvent) {
      setNewEventName(selectedEvent.Name);
      setNewEventDescription(selectedEvent.Description);
      setNewEventType(selectedEvent.TypeEvent);
      setNewEventConsequence(selectedEvent.Consequence);
      setUpdateEventModalOpen(true);
    }
  };

  const handleCloseUpdateEventModal = () => {
    setUpdateEventModalOpen(false);
    setNewEventName("");
    setNewEventDescription("");
    setNewEventType("");
    setNewEventConsequence("");
  };

  const handleUpdateEvent = async () => {
    if (selectedEvent) {
      try {
        const response = await updateevent(
          newEventName,
          newEventDescription,
          newEventType,
          newEventConsequence,
          selectedEvent.id
        );

        if (response && response.status >= 200 && response.status < 300) {
          if (selectedValeurMetier) handleSelectValeurMetier(selectedValeurMetier);
          alert("Evenement redoute created successfully!");
          handleCloseUpdateEventModal();
        } else {
          alert("Failed to create Evenement redoute. Please try again.");
        }
      } catch (error) {
        console.error("Error creating Evenement redoute:", error);
        alert("Failed to create Evenement redoute.");
      }
    }
  };


  const handleAddEvenementRedoute = () => {
    if (selectedValeurMetier) {
      navigate(`/add-evenementredoute/${selectedValeurMetier.id}`);
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

        <h4>Missions</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {missions.length > 0 ? (
            missions.map((mission) => (
              <li
                key={mission.id}
                onClick={() => handleSelectMission(mission)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedMission && selectedMission.id === mission.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
              >
                {mission.description || `Mission ${mission.id}`}
              </li>
            ))
          ) : (
            <p>No missions available.</p>
          )}
        </ul>
        {/* Buttons for updating or deleting */}
        <div>
          <button
            onClick={handleAddMissionClick}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Mission
          </button>
          <button
            onClick={handleUpdateMissionClick}
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
            onClick={handleDeleteMissionClick}
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

        <h4>Socle de securite</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {soclesDeSecurite.length > 0 ? (
            soclesDeSecurite.map((socle) => (
              <li
                key={socle.id}
                onClick={() => handleSelectSocleDeSecurite(socle)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedSocleDeSecurite &&
                    selectedSocleDeSecurite.id === socle.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
              >
                {socle.Name || `Socle ${socle.id}`}
              </li>
            ))
          ) : (
            <p>No Socle de securiter available.</p>
          )}
        </ul>
        {/* Buttons for updating or deleting */}
        <div>
          <button
            onClick={handleAddSocleClick}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "#2196f3",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Socle de securite
          </button>
          <button
            onClick={handleUpdateSocleClick}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "#ffc107",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Update Socle de securite
          </button>
          <button
            onClick={handleDeleteSocleClick}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Delete Socle de securite
          </button>
        </div>
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
        {selectedMission && !selectedSocleDeSecurite && (
          <div>
            <h3>Mission: {selectedMission.description}</h3>

            <h3>Valeur Metiers</h3>
            {valeursMetier.map((valeur) => (
              <div
                key={valeur.id}
                onClick={() => handleSelectValeurMetier(valeur)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedValeurMetier &&
                    selectedValeurMetier.id === valeur.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
              >
                <p>{valeur.Nom}</p>
              </div>
            ))}

            <button onClick={() => handleViewValeurMetier()}>
              View Valeur Metier
            </button>
            <button onClick={handleOpenAddValeurMetierModal}>
              Add Valeur Metier
            </button>
            <button onClick={handleOpenUpdateValeurMetierModal}>
              Update Valeur Metier
            </button>
            <button onClick={handleOpenDeleteValeurMetierModal}>
              Delete Valeur Metier
            </button>
          </div>
        )}

        {selectedSocleDeSecurite && !selectedMission && (
          <div>
            <h3>Socles De Securite: {selectedSocleDeSecurite.Name}</h3>
            <h4>Ecarts</h4>
            {ecarts.map((ecart) => (
              <div 
              key={ecart.id}
              onClick={() => handleSelectedEcart(ecart)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedEcart &&
                    selectedEcart.id === ecart.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
              >{ecart.TypeEcart}</div>
            ))}

            <button onClick={() => handleViewEcart()}>
              View Ecart
            </button>
            <button onClick={handleOpenAddEcartModal}>
              Add Ecart
            </button>
            <button onClick={handleOpenUpdateEcartModal}>
              Update Ecart
            </button>
            <button onClick={handleOpenDeleteEcartModal}>
              Delete Ecart
            </button>
          </div>
        )}

        {selectedValeurMetier && showBienEvent && (
          <div>
            <h3>Bien Supports and Evenements Redoutes for Valeur Metier</h3>
            <h4>Bien Supports</h4>
            {bienSupports.map((bien) => (
                <div 
                key={bien.id}
                onClick={() => handleSelectedBien(bien)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedBien &&
                    selectedBien.id === bien.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
                >{bien.Name}</div>
              ))}
            <button onClick={handleAddBienClick}>
              Add Bien support
            </button>
            <button onClick={handleUpdateBienClick}>
              Update Bien support
            </button>
            <button onClick={handleDeleteBienClick}>
              Delete Bien support
            </button>
            <h4>Evenements Redoutes</h4>
            {evenementsRedoutes.map((event) => (
                <div 
                key={event.id}
                onClick={() => handleSelectedEvent(event)}
                style={{
                  cursor: "pointer",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedEvent &&
                    selectedEvent.id === event.id
                      ? "#e0f7fa"
                      : "#f9f9f9", // Highlight selected app
                }}
                >{event.Name}</div>
              ))}
            <button onClick={() => handleViewEvent()}>
              View Evenement redoute
            </button>
            <button onClick={handleOpenAddEventModal}>
              Add Evenement redoute
            </button>
            <button onClick={handleOpenUpdateEventModal}>
              Update Evenement redoute
            </button>
            <button onClick={handleOpenDeleteEventModal}>
              Delete Evenement redoute
            </button>
          </div>
        )}
      </div>

      {/*======================================== mission modals ============================================*/}
      {isAddMissionModalOpen && (
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
            <h3>Add Mission</h3>
            <input
              type="text"
              placeholder="Mission description"
              value={newMissionDescription}
              onChange={(e) => setNewMissionDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleCreateMission}
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
      {isUpdateMissionModalOpen && (
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
            <h3>Update Mission</h3>
            <input
              type="text"
              value={updatedMissionDescription}
              onChange={(e) => setUpdatedMissionDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdateMission}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={() => setUpdateMissionModalOpen(false)}
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
            <h3>Are you sure you want to delete this mission?</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleDeleteMission}
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

      {/*======================================== valeur metier modals ============================================*/}
      {isAddValeurMetierModalOpen && (
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
            <h3>Add Valeur Metier</h3>
            <input
              type="text"
              placeholder="Name"
              value={newValeurMetierName}
              onChange={(e) => setNewValeurMetierName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <select
              value={newValeurMetierNature}
              onChange={(e) =>
                setNewValeurMetierNature(
                  e.target.value as "Processus" | "Information"
                )
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            >
              <option value="Processus">Processus</option>
              <option value="Information">Information</option>
            </select>
            <textarea
              placeholder="Description"
              value={newValeurMetierDescription}
              onChange={(e) => setNewValeurMetierDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="text"
              placeholder="Entite Responsable"
              value={newEntiteResponsable}
              onChange={(e) => setNewEntiteResponsable(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleCreateValeurMetier}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={handleCloseAddValeurMetierModal}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewValeurModal && selectedValeurMetier && (
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
            <h3>Valeur metier Details</h3>
            <p>
              <strong>Name:</strong> {selectedValeurMetier.Nom}
            </p>
            <p>
              <strong>Nature:</strong> {selectedValeurMetier.Nature}
            </p>
            <p>
              <strong>Description:</strong> {selectedValeurMetier.Description}
            </p>
            <p>
              <strong>Entite Responsable</strong>{" "}
              {selectedValeurMetier.EntiteResponsable}
            </p>
            <button
              onClick={handleCloseViewValeurModal}
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
      {isDeleteValeurConfirmationOpen && (
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
            <h3>Are you sure you want to delete this Valeur Metier?</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleDeleteValeur}
                style={{ padding: "10px 20px" }}
              >
                Yes
              </button>
              <button
                onClick={handleCloseDeleteValeurConfirmation}
                style={{ padding: "10px 20px" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdateValeurModalOpen && (
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
            <h3>Update Valeur Metier</h3>
            <input
              type="text"
              value={newValeurMetierName}
              onChange={(e) => setNewValeurMetierName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <select
              value={newValeurMetierNature}
              onChange={(e) =>
                setNewValeurMetierNature(
                  e.target.value as "Processus" | "Information"
                )
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            >
              <option value="Processus">Processus</option>
              <option value="Information">Information</option>
            </select>
            <textarea
              value={newValeurMetierDescription}
              onChange={(e) => setNewValeurMetierDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="text"
              value={newEntiteResponsable}
              onChange={(e) => setNewEntiteResponsable(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdateValeur}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={handleCloseUpdateValeurMetierModal}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/*======================================== socle de securite modals ============================================*/}
      {isAddSocleModalOpen && (
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
            <h3>Add Socle de securite</h3>
            <input
              type="text"
              placeholder="Socle de securiter name"
              value={newSocleName}
              onChange={(e) => setnewSocleName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleCreateSocle}
                style={{ padding: "10px 20px" }}
              >
                Create
              </button>
              <button
                onClick={handleCloseAddSocleModal}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update socle de securite  Modal */}
      {isUpdateSocleModalOpen && (
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
            <h3>Update Socle de securite</h3>
            <input
              type="text"
              value={newSocleName}
              onChange={(e) => setnewSocleName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdateSocle}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={() => setUpdateSocleModalOpen(false)}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete socle de securite  Modal */}
      {isDeleteSocleConfirmationOpen && (
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
            <h3>Are you sure you want to delete this socle de securite?</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleDeleteSocle}
                style={{ padding: "10px 20px" }}
              >
                Yes
              </button>
              <button
                onClick={handleCloseDeleteSocleConfirmation}
                style={{ padding: "10px 20px" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/*======================================== ecarts modals ============================================*/}
      {isAddEcartModalOpen && (
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
            <h3>Add Ecart</h3>
            <input
              type="text"
              placeholder="Type"
              value={newEcartType}
              onChange={(e) => setNewEcartType(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="Justification"
              value={newEcartJustification}
              onChange={(e) => setNewEcartJustification(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleCreateEcart}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={handleCloseAddEcartModal}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewEcartModal && selectedEcart && (
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
            <h3>Ecart Details</h3>
            <p>
              <strong>Name:</strong> {selectedEcart.TypeEcart}
            </p>
            <p>
              <strong>Nature:</strong> {selectedEcart.Justification}
            </p>
            <button
              onClick={handleCloseViewEcartModal}
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
      {isDeleteEcartConfirmationOpen && (
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
            <h3>Are you sure you want to delete this Ecart?</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleDeleteEcart}
                style={{ padding: "10px 20px" }}
              >
                Yes
              </button>
              <button
                onClick={handleCloseDeleteEcartConfirmation}
                style={{ padding: "10px 20px" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdateEcartModalOpen && (
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
            <h3>Update Ecart</h3>
            <input
              type="text"
              value={newEcartType}
              onChange={(e) => setNewEcartType(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              value={newEcartJustification}
              onChange={(e) => setNewEcartJustification(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdateEcart}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={handleCloseUpdateEcartModal}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/*======================================== bien modals ============================================*/}

      {isAddBienModalOpen && (
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
            <h3>Add Bien support</h3>
            <input
              type="text"
              placeholder="Bien support name"
              value={newBienName}
              onChange={(e) => setNewBienName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleCreateBien}
                style={{ padding: "10px 20px" }}
              >
                Create
              </button>
              <button
                onClick={handleCloseAddBienModal}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update socle de securite  Modal */}
      {isUpdateBienModalOpen && (
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
            <h3>Update Bien support</h3>
            <input
              type="text"
              value={newBienName}
              onChange={(e) => setNewBienName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdateBien}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={() => setUpdateBienModalOpen(false)}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete socle de securite  Modal */}
      {isDeleteBienConfirmationOpen && (
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
            <h3>Are you sure you want to delete this bien  support?</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleDeleteBien}
                style={{ padding: "10px 20px" }}
              >
                Yes
              </button>
              <button
                onClick={handleCloseDeleteBienConfirmation}
                style={{ padding: "10px 20px" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/*======================================== evenement redoute modals ============================================*/}
      {isAddEventModalOpen && (
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
            <h3>Add Evenement redoute</h3>
            <input
              type="text"
              placeholder="Name"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="Description"
              value={newEventDescription}
              onChange={(e) => setNewEventDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="text"
              placeholder="Type"
              value={newEventType}
              onChange={(e) => setNewEventType(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="text"
              placeholder="Consequence"
              value={newEventConsequence}
              onChange={(e) => setNewEventConsequence(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleCreateEvent}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={handleCloseAddEventModal}
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewEventModal && selectedEvent && (
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
            <h3>Valeur metier Details</h3>
            <p>
              <strong>Name:</strong> {selectedEvent.Name}
            </p>
            <p>
              <strong>Description:</strong> {selectedEvent.Description}
            </p>
            <p>
              <strong>Type:</strong> {selectedEvent.TypeEvent}
            </p>
            <p>
              <strong>Consequence</strong>{" "}
              {selectedEvent.Consequence}
            </p>
            <button
              onClick={handleCloseViewEventModal}
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
      {isDeleteEventConfirmationOpen && (
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
            <h3>Are you sure you want to delete this Evenement redoute?</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleDeleteEvent}
                style={{ padding: "10px 20px" }}
              >
                Yes
              </button>
              <button
                onClick={handleCloseDeleteEventConfirmation}
                style={{ padding: "10px 20px" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdateEventModalOpen && (
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
            <h3>Update Evenement redoute</h3>
            <input
              type="text"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              value={newEventDescription}
              onChange={(e) => setNewEventDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="text"
              value={newEventType}
              onChange={(e) => setNewEventType(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <input
              type="text"
              value={newEventConsequence}
              onChange={(e) => setNewEventConsequence(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdateEvent}
                style={{ padding: "10px 20px" }}
              >
                Save
              </button>
              <button
                onClick={handleCloseUpdateEventModal}
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

export default Atelier1;
