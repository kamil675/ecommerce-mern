import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import About from "./pages/About.jsx";
import Collections from "./pages/Collections.jsx";
import Product from "./pages/Product.jsx";
import Contact from "./pages/Contact.jsx";
import Nav from "./component/Nav.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";

import { UserDataContext } from "./context/UserContext.jsx";

function App() {
  const { userData } = useContext(UserDataContext);

  // 🔥 LOADING STATE
  if (userData === undefined) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white text-xl">
        Loading...
      </div>
    );
  }

  const isLoggedIn = !!userData;

  return (
    <>
      {/* NAVBAR (only when logged in) */}
      {isLoggedIn && <Nav />}

      <Routes>
        {/* AUTH ROUTES */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />}
        />

        <Route
          path="/signup"
          element={!isLoggedIn ? <Registration /> : <Navigate to="/" replace />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/about"
          element={isLoggedIn ? <About /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/collection"
          element={
            isLoggedIn ? <Collections /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/product"
          element={isLoggedIn ? <Product /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/contact"
          element={isLoggedIn ? <Contact /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/productdetail/:productId"
          element={
            isLoggedIn ? <ProductDetail /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/placeorder"
          element={
            isLoggedIn ? <PlaceOrder /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
