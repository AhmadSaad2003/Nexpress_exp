import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const updatestrat = async (Intitul:string, Description:string, IdEvenementRedoute:number, IdPartiePrenant:number, Gravite:number,stratId:number) => {
    try {
      const token = localStorage.getItem("token");
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const url = ROUTES.UPDATESTRAT.replace(":stratId", stratId.toString());
      const response = await axios.put(
        url,
        {
            Intitul,
            Description,
            IdEvenementRedoute,
            IdPartiePrenant,
            Gravite,
        },
        {
          headers,
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
            return response;  // You can return the full response if you need additional data
        } else {
            throw new Error('Failed to update scenario strategique');
        }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "An error occurred.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  };
