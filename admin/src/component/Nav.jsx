import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";

function Nav() {
  let navigate = useNavigate();
  let { serverUrl } = useContext(AuthDataContext);
  let { getAdmin } = useContext(AdminContext);
  const logOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="w-[100vw] h-[70px] bg-[#dcdbdbf8]
   z-10 fixed top-0 flex item-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-block"
    >
      <div
        className="w-[30%] flex items-center justify-start gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" className="w-[30px]" />
        <h1 className="text-[25px] font-sans text-[black]">OneCart</h1>
      </div>
      <button
        className="text-[15px] hover:border-[2px] border-[#89daea] 
        cursor-pointer bg-[#000000ca] my-[10px] rounded-2xl text-white py-[8px] px-[20px]"
        onClick={logOut}
      >
        LogOut
      </button>
    </div>
  );
}

export default Nav;
