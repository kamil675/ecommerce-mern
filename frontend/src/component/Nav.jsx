import React, { useContext, useState } from "react";
import { IoMdSearch, IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingCart, MdCollectionsBookmark } from "react-icons/md";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserDataContext } from "../context/UserContext";
import { AuthDataContext } from "../context/AuthContext";
import { ShopDataContext } from "../context/ShopContext";

function Nav() {
  // USER CONTEXT
  const { userData, setUserData } = useContext(UserDataContext);

  // AUTH CONTEXT
  const { serverUrl } = useContext(AuthDataContext);

  // SHOP CONTEXT
  const { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(ShopDataContext);

  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  // ================= LOGOUT =================

  const handleLogOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });

      console.log(result.data);

      // Clear frontend user state
      setUserData(null);

      // Close dropdown
      setShowProfile(false);

      // Redirect login
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}

      <div className="w-full h-[70px] bg-[#ecfafaec] fixed top-0 left-0 z-50 flex items-center justify-between px-[20px] md:px-[30px] shadow-md shadow-black">
        {/* ================= LOGO ================= */}

        <div
          className="text-[20px] font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1>OneCart</h1>
        </div>

        {/* ================= MENU ================= */}

        <ul className="hidden md:flex items-center gap-[19px] text-white">
          <li
            onClick={() => navigate("/")}
            className="text-[15px] hover:bg-[#7a7676] cursor-pointer bg-[#000000c9] py-[8px] px-[18px] rounded-2xl"
          >
            HOME
          </li>

          <li
            onClick={() => navigate("/collection")}
            className="text-[15px] hover:bg-[#7a7676] cursor-pointer bg-[#000000c9] py-[8px] px-[18px] rounded-2xl"
          >
            COLLECTIONS
          </li>

          <li
            onClick={() => navigate("/about")}
            className="text-[15px] hover:bg-[#7a7676] cursor-pointer bg-[#000000c9] py-[8px] px-[18px] rounded-2xl"
          >
            ABOUT
          </li>

          <li
            onClick={() => navigate("/contact")}
            className="text-[15px] hover:bg-[#7a7676] cursor-pointer bg-[#000000c9] py-[8px] px-[18px] rounded-2xl"
          >
            CONTACT
          </li>
        </ul>

        {/* ================= RIGHT ICONS ================= */}

        <div className="flex items-center gap-[20px] relative">
          {/* SEARCH ICON */}

          {!showSearch ? (
            <IoMdSearch
              className="w-[28px] h-[28px] cursor-pointer"
              onClick={() => {
                setShowSearch((prev) => !prev);
                navigate("/collection");
              }}
            />
          ) : (
            <IoSearchCircleSharp
              className="w-[34px] h-[34px] cursor-pointer"
              onClick={() => setShowSearch(false)}
            />
          )}

          {/* PROFILE */}

          {!userData ? (
            <CgProfile
              className="w-[28px] h-[28px] cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            />
          ) : (
            <div
              className="w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center cursor-pointer uppercase"
              onClick={() => setShowProfile(!showProfile)}
            >
              {userData?.name?.slice(0, 1)}
            </div>
          )}

          {/* CART */}

          <div className="relative hidden md:block">
            <MdOutlineShoppingCart
              className="w-[28px] h-[28px] cursor-pointer"
              onClick={() => navigate("/cart")}
            />

            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-2 py-1 rounded-full">
              {getCartCount()}
            </span>
          </div>
        </div>

        {/* ================= SEARCH BAR ================= */}

        {showSearch && (
          <div className="absolute top-[70px] left-0 w-full bg-[#d8f6f9dd] flex justify-center py-4">
            <input
              type="text"
              placeholder="Search here..."
              className="lg:w-[50%] w-[80%] bg-[#233533] text-white rounded-[30px] px-6 py-3 outline-none"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        )}

        {/* ================= PROFILE DROPDOWN ================= */}

        {showProfile && (
          <div className="absolute right-[30px] top-[70px] w-[200px] bg-black text-white rounded-lg shadow-lg">
            <ul className="flex flex-col p-3 gap-2 text-sm">
              {userData ? (
                <li
                  className="hover:bg-gray-600 px-3 py-2 rounded cursor-pointer"
                  onClick={handleLogOut}
                >
                  Logout
                </li>
              ) : (
                <li
                  className="hover:bg-gray-600 px-3 py-2 rounded cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                    setShowProfile(false);
                  }}
                >
                  Login
                </li>
              )}

              <li className="hover:bg-gray-600 px-3 py-2 rounded cursor-pointer">
                Orders
              </li>

              <li className="hover:bg-gray-600 px-3 py-2 rounded cursor-pointer">
                About
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}

      <div className="md:hidden fixed bottom-0 left-0 w-full h-[65px] bg-[#191818] flex items-center justify-around text-white z-50">
        {/* HOME */}

        <button
          onClick={() => navigate("/")}
          className="flex flex-col items-center text-[12px]"
        >
          <IoMdHome className="w-[22px] h-[22px]" />
          Home
        </button>

        {/* COLLECTION */}

        <button
          onClick={() => navigate("/collection")}
          className="flex flex-col items-center text-[12px]"
        >
          <MdCollectionsBookmark className="w-[22px] h-[22px]" />
          Collection
        </button>

        {/* CONTACT */}

        <button
          onClick={() => navigate("/contact")}
          className="flex flex-col items-center text-[12px]"
        >
          <CgProfile className="w-[22px] h-[22px]" />
          Contact
        </button>

        {/* CART */}

        <button
          onClick={() => navigate("/cart")}
          className="relative flex flex-col items-center text-[12px]"
        >
          <MdOutlineShoppingCart className="w-[22px] h-[22px]" />
          {/* BADGE */}
          <span
            className="absolute -top-1 -right-2 
            w-[18px] h-[18px] flex items-center justify-center
            bg-white text-black font-semibold
            rounded-full text-[9px]"
          >
            {getCartCount()}
          </span>
          Cart
        </button>
      </div>
    </>
  );
}

export default Nav;
