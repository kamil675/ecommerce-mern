import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import "./index.css";
import App from "./App.jsx";

import AuthContext from "./context/AuthContext.jsx";
import UserContext from "./context/UserContext.jsx";
import ShopContext from "./context/ShopContext.jsx";

// IMPORTANT
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
        <ShopContext>
          <App />
        </ShopContext>
      </UserContext>
    </AuthContext>
  </BrowserRouter>,
);
