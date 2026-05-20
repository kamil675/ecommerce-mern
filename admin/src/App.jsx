import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Orders from "./pages/Orders.jsx";
import Login from "./pages/Login.jsx";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext.jsx";

function App() {
  let { adminData } = useContext(AdminContext);
  return (
    <>
      {!adminData ? (
        <Login />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/lists" element={<List />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
