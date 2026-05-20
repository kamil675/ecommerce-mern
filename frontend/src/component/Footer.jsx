import React from "react";
import logo from "../assets/back5.jpg";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-[#111827] text-white pt-10 px-6 md:px-16">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
        {/* LEFT SECTION */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
            <h2 className="text-2xl font-semibold">OneCart</h2>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            OneCart is your all-in-one online shopping destination, offering
            top-quality products, unbeatable deals, and fast delivery — all
            backed by trusted service designed to make your life easier every
            day.
          </p>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
            COMPANY
          </h3>
          <ul className="flex flex-col gap-3 text-gray-300 text-sm">
            <li
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-white transition"
            >
              Home
            </li>
            <li
              onClick={() => navigate("/about")}
              className="cursor-pointer hover:text-white transition"
            >
              About Us
            </li>
            <li className="cursor-pointer hover:text-white transition">
              Delivery
            </li>
            <li className="cursor-pointer hover:text-white transition">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2">
            GET IN TOUCH
          </h3>
          <ul className="flex flex-col gap-3 text-gray-300 text-sm">
            <li>+91-903556389</li>
            <li>contact@onecart.com</li>
            <li>+91-123456789</li>
            <li>admin@onecart.com</li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="w-full bg-[#0b1120] py-4 text-center text-sm text-gray-400">
        © 2026 OneCart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
