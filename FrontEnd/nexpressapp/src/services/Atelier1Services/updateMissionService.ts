import axios from "axios";
import { ROUTES } from "../../routes/routes";

export const updatemission = async (missionId:number, content: string) => {
    try {
      const token = localStorage.getItem("token");
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const bodydata={
        description: content,
      }
      const url = ROUTES.UPDATEMISSION.replace(":missionId", missionId.toString());
      const response = await axios.put(
        url,
        bodydata,
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
