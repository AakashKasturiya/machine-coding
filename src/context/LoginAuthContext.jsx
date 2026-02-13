// src/context/LoginAuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    if (username === "admin" && password === "1234") {
      const fakeToken = "jwt-token-12345";
      localStorage.setItem("token", fakeToken);
      setUser({ token: fakeToken });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
