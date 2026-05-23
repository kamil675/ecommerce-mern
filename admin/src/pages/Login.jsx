import React, { useState, useContext } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl } = useContext(AuthDataContext);
  const { getAdmin } = useContext(AdminContext);

  const navigate = useNavigate();

  const AdminLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("SERVER URL:", serverUrl);
      const result = await axios.post(serverUrl + "/api/auth/adminlogin", {
        email,
        password,
      });

      console.log(result.data);

      localStorage.setItem("token", result.data.token);

      await getAdmin();

      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.error);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex items-center justify-center px-4">
      <div className="max-w-[500px] w-full bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Login Page</h2>
          <p className="text-sm text-gray-300">
            Welcome to our cart, apply to admin login
          </p>
        </div>

        <form onSubmit={AdminLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="h-[45px] border border-[#96969635] rounded-lg bg-transparent px-4 text-sm"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

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

          <button
            type="submit"
            className="h-[45px] bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-sm"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
