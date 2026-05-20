import React, { createContext } from "react";

export const AuthDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  return (
    <AuthDataContext.Provider value={{ serverUrl }}>
      {children}
    </AuthDataContext.Provider>
  );
}

export default AuthContext;
