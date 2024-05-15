import React, { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, verifyTokenRequest } from "../api/user";
import axios from "../api/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();
import { alertCustom,alertCustomWithTimerInterval } from "../utils/alertCustom.js";
import { updatePasswordRequest } from "../api/user";

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};

const normalizeUser = (user) => {
  if ("id" in user && !("_id" in user)) {
    user._id = user.id;
    delete user.id;
  }
  return user;
};

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userChangeFlag, setUserChangeFlag] = useState(false);
  const [cart, setCart] = useState([]);


  const triggerUserUpdate = () => {
    setUserChangeFlag((prevFlag) => !prevFlag);
  };

  const signup = async (user) => {
    try {
      setLoading(true);
      const res = await registerRequest(user);
      const normalizedUser = normalizeUser(res.data);
      setUser(normalizedUser);
      alertCustom('¡Éxito!', 'Usuario creado correctamente.', 'success');
      navigate("/login");
    } catch (error) {
      alertCustom(
        "Upps",
        "Ocurrió un error al crear el usuario. Por favor, intente nuevamente.",
        "error"
      );
      setLoading(false);
    }
  };

  const signin = async (user) => {
    try {
      const res = await axios.post("user/login", user);
      const normalizedUser = normalizeUser(res.data);
      setUser(normalizedUser);
      setIsAuthenticated(true);
    } catch (error) {
      alertCustom(
        "Upps",
        "Ocurrió un error al iniciar sesión. Por favor, intente nuevamente.",
        "error"
      );
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const updatePassword = async (data) => {
    try {
      setLoading(true);
      await updatePasswordRequest(data); 
      alertCustomWithTimerInterval('¡Éxito!', 'Contraseña actualizada correctamente. Inicia sesión nuevamente.', 'success');
      const alertTimeout = setTimeout(() => {
        logout();
      }, 2000); 
      return () => clearTimeout(alertTimeout);
    } catch (error) {
      setErrors(["Error al actualizar la contraseña."]);
      alertCustom(
        "Upps",
        "Ocurrió un error al actualizar la contraseña. Por favor, intente nuevamente.",
        "error"
      );
      setLoading(false);
    }
  };   

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        const normalizedUser = normalizeUser(res.data);
        setIsAuthenticated(true);
        setUser(normalizedUser);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{
        signup,
        signin,
        setUser,
        triggerUserUpdate,
        user,
        loading,
        isAuthenticated,
        errors,
        logout,
        updatePassword
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
