import React, { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, verifyTokenRequest } from "../api/user";
import axios from "../api/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();
import { alertCustom } from "../utils/alertCustom.js";

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

  const getCartFromBackend = async () => {
    try {
      // Lógica para obtener el carrito desde el backend
      const res = await axios.get('/user/cart');
      setCart(res.data.cart);
    } catch (error) {
      console.error("Error fetching cart from backend:", error);
    }
  };

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

  const addToCart = (product) => {
    setCart((currentCart) => {
      const productExists = currentCart.find(
        (item) => item._id === product._id
      );
      if (productExists) {
        return currentCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const incrementQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((product) =>
        product._id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((product) =>
        product._id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
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
        addToCart,
        cart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        getCartFromBackend,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
