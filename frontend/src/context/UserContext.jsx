import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = import.meta.env.VITE_API_URL;

  const [userData, setUserData] = useState(undefined);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/user/getcurrentuser`);

      console.log("CURRENT USER:", data);

      if (data.success) {
        setUserData(data.user);
        return data.user;
      }

      setUserData(null);
      return null;
    } catch (error) {
      console.log("GET USER ERROR:", error.response?.data);

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
