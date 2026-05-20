import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserDataContext = createContext();

function UserContext({ children }) {
  const serverUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:8000"
      : import.meta.env.VITE_API_URL;

  // undefined = loading
  // null = not logged in
  // object = logged in

  const [userData, setUserData] = useState(undefined);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
        withCredentials: true,
      });

      console.log("CURRENT USER:", result.data);

      if (result.data.success) {
        setUserData(result.data.user);

        return result.data.user;
      } else {
        setUserData(null);

        return null;
      }
    } catch (error) {
      console.log(error);

      setUserData(null);

      return null;
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    userData,
    setUserData,
    getCurrentUser,
    serverUrl,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
