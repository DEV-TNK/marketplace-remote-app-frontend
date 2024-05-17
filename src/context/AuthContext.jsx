import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../Components/Showtoast";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [email, setEmail] = useState(null);

  const Login = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `https://unleashified-backend.azurewebsites.net/api/v1/login`,
        {
          email: data.email,
          password: data.password,
        }
      );
      setLoading(false);
      if (response.status === 200) {
        const name = response.data.data.username;
        const id = response.data.data.UserId;
        const image = response.data.data.image
          ? response.data.data.image
          : null;
        const role = response.data.data.role;
        const userEmail = response.data.data.email;
        setUser(name);
        setUserId(id);
        setUserImage(image);
        setUserRole(role);
        setEmail(userEmail);

        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("refreshToken", response.data.refreshToken);
        sessionStorage.setItem("UserId", id);
        sessionStorage.setItem("username", name);
        sessionStorage.setItem("image", image);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("email", userEmail);
        sessionStorage.setItem("profile", response.data.data.profile);
        const seekerURL = sessionStorage.getItem("redirectSeekerUrl");
        showToast(response.data.message);
        if (response.data.data.role === "seeker") {
          if (response.data.data.profile === true) {
            if (seekerURL) {
              navigate(seekerURL);
            } else {
              navigate("/JobSeeker");
            }
          } else if (response.data.data.profile === false) {
            navigate("/jobs/upload-resume");
          }
        } else if (response.data.data.role === "provider") {
          if (response.data.data.profile === true) {
            navigate("/Providerdashboard");
          } else {
            navigate("/provider-profile");
          }
        } else if (response.data.data.role === "admin") {
          navigate("/admin/dashboard/overview");
        }
        if (response.data.data.role === "admin") {
          navigate("/admin/dashboard/overview");
        }
        if (response.data.data.email === "admin") {
          navigate("/admin/signin");
        }
      }
    } catch (error) {
      setLoading(false);
      showToast(error.response.data.message);
    }
  };

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    const userId = sessionStorage.getItem("UserId");
    const userImage = sessionStorage.getItem("image");
    const userRole = sessionStorage.getItem("role");
    const userEmail = sessionStorage.getItem("email");
    if (storedUsername) {
      setUser(storedUsername);
    }
    if (userId) {
      setUserId(userId);
    }
    if (userImage) {
      setUserImage(userImage);
    }
    if (userRole) {
      setUserRole(userRole);
    }
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const LogOut = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userId = sessionStorage.getItem("UserId");
      const response = await axios.post(
        `https://jupeb-site-backend.onrender.com/api/v1/logOut`,
        { user: userId }
      );
      setLoading(false);
      setUser(null);
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("UserId");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("role");

      showToast(response.data.message);
      navigate("/");
    } catch (error) {
      setLoading(false);
      showToast(error.response.data.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        userId,
        userRole,
        email,
        setUser,
        setUserRole,
        setUserImage,
        Login,
        setLoading,
        LogOut,
        userImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useGlobalContext = () => useContext(UserContext);

export { useGlobalContext, UserProvider };
