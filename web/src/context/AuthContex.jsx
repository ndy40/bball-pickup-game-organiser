import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/api";

const AuthContex = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfile();
        setUser(response.data);
      } catch (error) {}
      setIsloading(false);
    };
    fetchData();
  }, []);

  const authValue = {
    user,
    isLoading,
  };

  return (
    <AuthContex.Provider value={authValue}>{children}</AuthContex.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContex);
