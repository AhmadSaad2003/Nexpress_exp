import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const updatepacs = async (
  pacsId: number,
  MesureDeSecurite: string,
  Responsable: string,
  DifficulteDeMisEnOeuvre: string,
  Complexite: number,
  DureeEcheance: number,
  Status: string
) => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const url = ROUTES.UPDATEPACS.replace(":pacsId", pacsId.toString());

    const response = await axios.put(
      url,
      {
        MesureDeSecurite,
        Responsable,
        DifficulteDeMisEnOeuvre,
        Complexite,
        DureeEcheance,
        Status,
      },
      { headers }
    );

    if (response.status >= 200 && response.status < 300) {
      return response; // Return full response if needed
    } else {
      throw new Error("Failed to update PACS");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
