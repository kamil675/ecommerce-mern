import React, { useContext } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Orders from "./pages/Orders.jsx";
import Login from "./pages/Login.jsx";

import { AdminContext } from "./context/AdminContext.jsx";

function App() {
  const { adminData } = useContext(AdminContext);

  console.log("APP ADMIN:", adminData);

  return (
    <Routes>
      <Route
        path="/login"
        element={adminData ? <Navigate to="/" /> : <Login />}
      />

      <Route
        path="/"
        element={adminData ? <Home /> : <Navigate to="/login" />}
      />

      <Route
        path="/add"
        element={adminData ? <Add /> : <Navigate to="/login" />}
      />

      <Route
        path="/lists"
        element={adminData ? <List /> : <Navigate to="/login" />}
      />

      <Route
        path="/orders"
        element={adminData ? <Orders /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
