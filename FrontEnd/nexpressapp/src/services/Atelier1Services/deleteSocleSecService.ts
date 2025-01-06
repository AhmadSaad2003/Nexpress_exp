import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const deletesocle = async (socleId:number) => {
    try {
      const token = localStorage.getItem("token");
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const url = ROUTES.DELETESOCLE.replace(":socleId", socleId.toString());
      const response = await axios.delete(
        url,
        {
          headers,
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
            return response;  // You can return the full response if you need additional data
        } else {
            throw new Error('Failed to delete socle de securite');
        }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "An error occurred.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  };
