import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = import.meta.env.VITE_API_URL;

  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      if (!token) {
        setUserData(null);
        return null;
      }

      const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("CURRENT USER:", result.data);

      if (result.data.success) {
        setUserData(result.data.user);
        return result.data.user;
      }
    } catch (error) {
      console.log(
        "GET CURRENT USER ERROR:",
        error.response?.data || error.message,
      );

      localStorage.removeItem("token");

      setUserData(null);

      return null;
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        getCurrentUser,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
