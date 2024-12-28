import axios from "@/utils/axiosInstance";

export const login = async (data: { identifier: string; password: string }) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};
export const logout = async () => {
    const response = await axios.post("/auth/logout");
    localStorage.removeItem("authToken")
    return response.data;
  };
  