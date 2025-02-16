import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const updatescenarioopp = async (Intitul:string, Connaitre:string, Rentrer:string, Trouver:string, Exploiter:string, Vraisemblence:number,oppId:number) => {
    try {
      const token = localStorage.getItem("token");
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const url = ROUTES.UPDATESCENARIOOPP.replace(":oppId", oppId.toString());
      const response = await axios.put(
        url,
        {
            Intitul,
            Connaitre,
            Rentrer,
            Trouver,
            Exploiter,
            Vraisemblence
        },
        {
          headers,
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
            return response;  // You can return the full response if you need additional data
        } else {
            throw new Error('Failed to update scenario opperationnel');
        }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "An error occurred.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  };
