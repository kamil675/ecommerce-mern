import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useContext } from "react";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase.js";
import { UserDataContext } from "../context/UserContext";

function Login() {
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { serverUrl } = useContext(AuthDataContext);
  let { getCurrentUser } = useContext(UserDataContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      console.log(result.data);

      // IMPORTANT
      const currentUser = await getCurrentUser();

      if (currentUser) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const googlelogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      let user = response.user;

      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        {
          name,
          email,
        },
        {
          withCredentials: true,
        },
      );

      console.log(result.data);

      // IMPORTANT
      const currentUser = await getCurrentUser();

      if (currentUser) {
        navigate("/");
      }
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
          <h2 className="text-2xl font-semibold">Login Page</h2>
          <p className="text-sm text-gray-300">
            Welcome to our cart, place your order
          </p>
        </div>

        {/* Form Box */}
        <div className="max-w-[500px] w-full bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg p-6">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Google Button */}
            <div
              className="h-[45px] bg-[#42656cae] rounded-lg flex items-center justify-center cursor-pointer text-sm font-medium"
              onClick={googlelogin}
            >
              Login with Google
            </div>

            {/* OR */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="flex-1 h-[1px] bg-[#96969635]"></div>
              OR
              <div className="flex-1 h-[1px] bg-[#96969635]"></div>
            </div>

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
              Login
            </button>

            {/* Login */}
            <p
              onClick={() => navigate("/signup")}
              className="text-gray-400 text-sm text-center cursor-pointer hover:text-white"
            >
              you have not account?{" "}
              <span className="text-blue-400">Create New account</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
