import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const updateValeurMetier = async (Nom: string, Nature: string, Description: string, EntiteResponsable: string, valeurId:number) => {
    try {
      const token = localStorage.getItem("token");
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const url = ROUTES.UPDATEVALEURMETIER.replace(":valeurId", valeurId.toString());
      const response = await axios.put(
        url,
        {
            Nom,
            Nature,
            Description,
            EntiteResponsable,
        },
        {
          headers,
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
            return response;  // You can return the full response if you need additional data
        } else {
            throw new Error('Failed to update app');
        }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "An error occurred.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  };
