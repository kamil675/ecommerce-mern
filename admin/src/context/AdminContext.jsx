import React, { useState, createContext, useEffect, useContext } from "react";

import axios from "axios";

import { AuthDataContext } from "./AuthContext";

export const AdminContext = createContext();

function AdminProvider({ children }) {
  const [adminData, setAdminData] = useState(null);

  const { serverUrl } = useContext(AuthDataContext);

  const getAdmin = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/getadmin`, {
        withCredentials: true,
      });

      setAdminData(result.data);
    } catch (error) {
      setAdminData(null);

      if (error.response?.status !== 401) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        adminData,
        setAdminData,
        getAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default AdminProvider;
