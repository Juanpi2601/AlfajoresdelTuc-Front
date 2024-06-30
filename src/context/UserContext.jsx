import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { registerRequest, verifyTokenRequest, updatePasswordRequest } from "../api/user";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { alertCustom, alertCustomWithTimerInterval } from "../utils/alertCustom.js";

export const UserContext = createContext();

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
  const logoutTimerRef = useRef(null);

  const checkLogin = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const userStr = sessionStorage.getItem('user');

      // console.log("SessionStorage values on load:", { token, userStr });

      if (token && userStr) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await verifyTokenRequest();
        // console.log("Token verification response:", res);
        if (res.status === 200) {
          const normalizedUser = normalizeUser(JSON.parse(userStr));
          setIsAuthenticated(true);
          setUser(normalizedUser);
        } else {
          // console.log("Token verification failed with status:", res.status);
          setIsAuthenticated(false);
          setUser(null);
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    } catch (error) {
      // console.log("Error during token verification:", error);
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' || !navigator.onLine) {
        startLogoutTimer();
      } else {
        clearLogoutTimer();
      }
    };

    const startLogoutTimer = () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
      logoutTimerRef.current = setTimeout(() => {
        alertCustom('Sesión cerrada', 'Tu sesión ha sido cerrada por inactividad.', 'info');
        logout();
        window.location.reload();
      }, 300000);
    };

    const clearLogoutTimer = () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('offline', handleVisibilityChange);
    window.addEventListener('online', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('offline', handleVisibilityChange);
      window.removeEventListener('online', handleVisibilityChange);
      clearLogoutTimer();
    };
  }, []);

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
      const res = await axios.post("/user/login", user);
      const token = res.data.token;
      const normalizedUser = normalizeUser(res.data);

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(normalizedUser));

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(normalizedUser);
      setIsAuthenticated(true);

      navigate("/");
    } catch (error) {
      alertCustom(
        "Upps",
        "Ocurrió un error al iniciar sesión. Por favor, inténtelo nuevamente.",
        "error"
      );
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate("/login");
    window.location.reload();
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

  const contextValues = {
    signup,
    signin,
    setUser,
    user,
    loading,
    isAuthenticated,
    errors,
    logout,
    updatePassword
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
