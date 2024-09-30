// authInterceptors.jsx
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AxiosInterceptor = () => {
  const navigate = useNavigate();
  const authFetch = axios.create({
    withCredentials: true,
  });

  authFetch.interceptors.request.use(
    (config) => {
      const accessToken = sessionStorage.getItem("accessToken");
      const refreshToken = sessionStorage.getItem("refreshToken");

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      if (refreshToken) {
        config.headers["Refresh-Token"] = `Bearer ${refreshToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      const newAccessToken =
        response.headers["authorization"]?.split("Bearer ")[1];
      if (newAccessToken) {
        console.log(newAccessToken);
        sessionStorage.setItem("accessToken", newAccessToken);
      }
      return response;
    },
    (error) => {
      // if (error.response.status === 404) {
      //   navigate("*");
      // } else
      if (error.response.status === 401) {
        navigate("/creator/signin");
      }

      return Promise.reject(error);
    }
  );

  return authFetch;
};

export default AxiosInterceptor;
