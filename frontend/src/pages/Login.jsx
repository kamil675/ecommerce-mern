import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";

import { AuthDataContext } from "../context/AuthContext";
import { UserDataContext } from "../context/UserContext";

function Login() {
  const navigate = useNavigate();

  const { serverUrl } = useContext(AuthDataContext);
  const { getCurrentUser } = useContext(UserDataContext);

  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // ================= NORMAL LOGIN =================

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("SERVER URL:", serverUrl);

      const result = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", result.data);

      // ================= TOKEN CHECK =================

      if (!result.data.token) {
        console.log("TOKEN NOT RECEIVED FROM BACKEND");

        alert("Token not received from backend");

        setLoading(false);

        return;
      }

      // ================= SAVE TOKEN =================

      localStorage.setItem("token", result.data.token);

      console.log("TOKEN SAVED:", localStorage.getItem("token"));

      // ================= GET USER =================

      const currentUser = await getCurrentUser();

      console.log("CURRENT USER:", currentUser);

      if (currentUser) {
        navigate("/");
      } else {
        alert("User fetch failed");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error.message);

      alert(error.response?.data?.error || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================

  const googleLogin = async () => {
    try {
      setLoading(true);

      // FIREBASE LOGIN

      const response = await signInWithPopup(auth, provider);

      const user = response.user;

      console.log("GOOGLE USER:", user);

      // BACKEND LOGIN
      console.log("SERVER URL:", serverUrl);
      const result = await axios.post(`${serverUrl}/api/auth/googlelogin`, {
        name: user.displayName,
        email: user.email,
      });

      console.log("GOOGLE LOGIN RESPONSE:", result.data);

      // TOKEN CHECK

      if (!result.data.token) {
        console.log("GOOGLE TOKEN NOT RECEIVED");

        alert("Google token missing");

        setLoading(false);

        return;
      }

      // SAVE TOKEN

      localStorage.setItem("token", result.data.token);

      console.log("TOKEN SAVED:", localStorage.getItem("token"));

      // GET USER

      const currentUser = await getCurrentUser();

      console.log("CURRENT USER:", currentUser);

      if (currentUser) {
        navigate("/");
      } else {
        alert("Google user fetch failed");
      }
    } catch (error) {
      console.log("GOOGLE LOGIN ERROR:", error.response?.data || error.message);

      alert("Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white flex justify-center items-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-[400px] bg-[#111] p-5 rounded-lg flex flex-col gap-4 border border-gray-700"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {/* GOOGLE LOGIN */}

        <button
          type="button"
          onClick={googleLogin}
          disabled={loading}
          className="h-[45px] bg-blue-500 hover:bg-blue-600 rounded-lg transition-all"
        >
          {loading ? "Please wait..." : "Login with Google"}
        </button>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          required
          className="h-[45px] px-3 rounded-lg bg-transparent border border-gray-600 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}

        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            required
            className="h-[45px] px-3 rounded-lg bg-transparent border border-gray-600 outline-none w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {show ? (
            <FaEye
              className="absolute top-4 right-3 cursor-pointer"
              onClick={() => setShow(false)}
            />
          ) : (
            <FaEyeSlash
              className="absolute top-4 right-3 cursor-pointer"
              onClick={() => setShow(true)}
            />
          )}
        </div>

        {/* LOGIN BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="h-[45px] bg-green-500 hover:bg-green-600 rounded-lg transition-all"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* SIGNUP */}

        <p
          className="text-center cursor-pointer text-gray-300 hover:text-white"
          onClick={() => navigate("/signup")}
        >
          Create Account
        </p>
      </form>
    </div>
  );
}

export default Login;
