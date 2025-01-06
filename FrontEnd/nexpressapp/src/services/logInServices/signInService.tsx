import axios from "axios";
import { AUTH_ROUTES } from "../../routes/routes";

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(AUTH_ROUTES.SIGNIN, {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log(localStorage.getItem("token"));
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "An error occurred during sign up."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
