import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const updatepartie = async (Nom: string, Activite: string, Depandance: number,Penetration: number,Maturite: number,Confiance: number, partieId:number, IdEcosysteme:number) => {
    try {
      const token = localStorage.getItem("token");
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const url = ROUTES.UPDATEPARTIE.replace(":partieId", partieId.toString());
      const response = await axios.put(
        url,
        {
            Nom,
            Activite,
            Depandance,
            Penetration,
            Maturite,
            Confiance,
            IdEcosysteme
        },
        {
          headers,
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
            return response;  // You can return the full response if you need additional data
        } else {
            throw new Error('Failed to update evenement redoute');
        }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "An error occurred.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  };
