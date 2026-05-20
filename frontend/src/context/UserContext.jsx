import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const [userData, setUserData] = useState(undefined);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
        withCredentials: true,
      });

      console.log("CURRENT USER:", data);

      if (data.success) {
        setUserData(data.user);
        return data.user;
      } else {
        setUserData(null);
        return null;
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        console.log("GET USER ERROR:", error);
      }

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
        serverUrl,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
