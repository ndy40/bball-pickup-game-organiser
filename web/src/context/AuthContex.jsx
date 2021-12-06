import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../services/AuthService";

const AuthContex = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfile();
        setUser(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const authValue = {
    user,
  };

  return (
    <AuthContex.Provider value={authValue}>{children}</AuthContex.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContex);
