import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const createpacs = async (
  MesureDeSecurite: string,
  Responsable: string,
  DifficulteDeMisEnOeuvre: string,
  Complexite: number,
  DureeEcheance: number,
  Status: string,
  IdApp: number
) => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(
      ROUTES.CREATEPACS,
      {
        MesureDeSecurite,
        Responsable,
        DifficulteDeMisEnOeuvre,
        Complexite,
        DureeEcheance,
        Status,
        IdApp,
      },
      { headers }
    );

    if (response.status >= 200 && response.status < 300) {
      return response; // Return full response if needed
    } else {
      throw new Error("Failed to create PACS");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "An error occurred during creation."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
