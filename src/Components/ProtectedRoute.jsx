import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [token] = useState(sessionStorage.getItem("accessToken"));
  const navigate = useNavigate();
  console.log("this is token", token);

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  if (loggedIn === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        {" "}
        <img src="loader.gif" className="w-60 h-60" alt="loader" />{" "}
      </div>
    );
  }

  return loggedIn ? <Outlet /> : <Navigate to="/authentication/signin" />;
};

export default ProtectedRoutes;
