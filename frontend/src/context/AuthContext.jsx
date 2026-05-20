import React, { createContext } from "react";

export const AuthDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:8000"
      : import.meta.env.VITE_API_URL;

  const value = {
    serverUrl,
  };

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
}

export default AuthContext;
