import React from "react";
import { createContext } from "react";

export const AuthDataContext = createContext();

function AuthContext({ children }) {
  let serverUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  let value = {
    serverUrl,
  };
  return (
    <div>
      <AuthDataContext.Provider value={value}>
        {children}
      </AuthDataContext.Provider>
    </div>
  );
}

export default AuthContext;
