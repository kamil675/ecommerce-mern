import React, { useState, createContext, useEffect, useContext } from "react";

import axios from "axios";

import { AuthDataContext } from "./AuthContext";

export const AdminContext = createContext();

function AdminProvider({ children }) {
  const [adminData, setAdminData] = useState(null);

  const { serverUrl } = useContext(AuthDataContext);

  const getAdmin = async () => {
    try {
      // Get token
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      // If no token
      if (!token) {
        console.log("No token found");
        return;
      }

      // API call
      const result = await axios.get(`${serverUrl}/api/user/getadmin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("ADMIN DATA:", result.data);

      // Save admin data
      setAdminData(result.data);
    } catch (error) {
      console.log("GET ADMIN ERROR:");

      console.log(error.response?.data);

      setAdminData(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getAdmin();
    }
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
