import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useContext } from "react";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase.js";
import { UserDataContext } from "../context/UserContext";

function Registration() {
  let [show, setShow] = useState(false);
  let { serverUrl } = useContext(AuthDataContext);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { getCurrentUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/registration",
        {
          name,
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(result.data);
      await getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.error);
    }
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true },
      );
      console.log(result.data);
      await getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col overflow-hidden">
      {/* Header */}

      {/* Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Registration Page</h2>
          <p className="text-sm text-gray-300">
            Welcome to our cart, place your order
          </p>
        </div>

        {/* Form Box */}
        <div className="max-w-[500px] w-full bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg p-6">
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            {/* Google Button */}
            <div
              className="h-[45px] bg-[#42656cae] rounded-lg flex items-center justify-center cursor-pointer text-sm font-medium"
              onClick={googleSignup}
            >
              Registration with Google
            </div>

            {/* OR */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="flex-1 h-[1px] bg-[#96969635]"></div>
              OR
              <div className="flex-1 h-[1px] bg-[#96969635]"></div>
            </div>

            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              className="h-[45px] border border-[#96969635] rounded-lg bg-transparent px-4 text-sm"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="h-[45px] border border-[#96969635] rounded-lg bg-transparent px-4 text-sm"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            {/* Password */}
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="h-[45px] w-full border border-[#96969635] rounded-lg bg-transparent px-4 pr-10 text-sm"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              {show ? (
                <FaEye
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShow(false)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShow(true)}
                />
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="h-[45px] bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-sm"
            >
              Create Account
            </button>

            {/* Login */}
            <p
              onClick={() => navigate("/login")}
              className="text-gray-400 text-sm text-center cursor-pointer hover:text-white"
            >
              Already have an account?{" "}
              <span className="text-blue-400">Login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
