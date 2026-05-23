import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Nav() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (
    <div
      className="
      w-screen
      h-[70px]
      bg-[#dcdbdbf8]
      fixed
      top-0
      z-50
      flex
      items-center
      justify-between
      px-[30px]
      shadow-md
      "
    >
      <div
        className="
        flex
        items-center
        gap-[10px]
        cursor-pointer
        "
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" className="w-[30px]" />

        <h1 className="text-[25px] text-black">OneCart</h1>
      </div>

      <button
        className="
        bg-black
        text-white
        px-[20px]
        py-[8px]
        rounded-xl
        "
        onClick={logOut}
      >
        Logout
      </button>
    </div>
  );
}

export default Nav;
