import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { AuthDataContext } from "./AuthContext.jsx";
import { UserDataContext } from "./UserContext.jsx";

export const ShopDataContext = createContext();

function ShopContext({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});

  const { serverUrl } = useContext(AuthDataContext);
  const { userData } = useContext(UserDataContext);

  const currency = "₹";
  const delivery_fee = 40;

  // ================= GET TOKEN =================

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // ================= GET PRODUCTS =================

  const getProducts = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`);

      console.log("PRODUCTS:", result.data);

      setProducts(result.data.product || []);
    } catch (error) {
      console.log("GET PRODUCTS ERROR:", error.response?.data || error.message);
    }
  };

  // ================= ADD TO CART =================

  const addToCart = async (itemId, size) => {
    try {
      if (!size) {
        return alert("Please select size");
      }

      let cartData = structuredClone(cartItem);

      if (cartData[itemId]) {
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
      } else {
        cartData[itemId] = {
          [size]: 1,
        };
      }

      setCartItem(cartData);

      const token = getToken();

      console.log("ADD CART TOKEN:", token);

      if (userData && token) {
        const result = await axios.post(
          `${serverUrl}/api/cart/addtocart`,
          {
            itemId,
            size,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("ADD TO CART RESPONSE:", result.data);
      }
    } catch (error) {
      console.log("ADD TO CART ERROR:", error.response?.data || error.message);
    }
  };

  // ================= GET USER CART =================

  const getUserCart = async () => {
    try {
      const token = getToken();

      console.log("GET CART TOKEN:", token);

      if (!token) return;

      const result = await axios.post(
        `${serverUrl}/api/cart/getusercart`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("USER CART:", result.data);

      setCartItem(result.data.cartData || {});
    } catch (error) {
      console.log(
        "GET USER CART ERROR:",
        error.response?.data || error.message,
      );
    }
  };

  // ================= UPDATE QUANTITY =================

  const updateQuantity = async (itemId, size, quantity) => {
    try {
      let cartData = structuredClone(cartItem);

      cartData[itemId][size] = quantity;

      setCartItem(cartData);

      const token = getToken();

      console.log("UPDATE TOKEN:", token);

      if (userData && token) {
        const result = await axios.post(
          `${serverUrl}/api/cart/updatecart`,
          {
            itemId,
            size,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("UPDATE CART RESPONSE:", result.data);
      }
    } catch (error) {
      console.log("UPDATE CART ERROR:", error.response?.data || error.message);
    }
  };

  // ================= CART COUNT =================

  const getCartCount = () => {
    let total = 0;

    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        total += cartItem[productId][size];
      }
    }

    return total;
  };

  // ================= CART AMOUNT =================

  const getCartAmount = () => {
    let total = 0;

    for (const productId in cartItem) {
      const product = products.find((p) => p._id === productId);

      if (!product) continue;

      for (const size in cartItem[productId]) {
        const quantity = cartItem[productId][size];

        total += product.price * quantity;
      }
    }

    return total + delivery_fee;
  };

  // ================= ORDER ITEMS =================

  const getCartItemsForOrder = () => {
    let orderItems = [];

    for (const productId in cartItem) {
      const product = products.find((p) => p._id === productId);

      if (!product) continue;

      for (const size in cartItem[productId]) {
        const quantity = cartItem[productId][size];

        orderItems.push({
          productId,
          name: product.name,
          price: product.price,
          quantity,
          size,
          image: product.image1,
        });
      }
    }

    return orderItems;
  };

  // ================= CLEAR CART =================

  const clearCart = () => {
    setCartItem({});
  };

  // ================= LOAD PRODUCTS =================

  useEffect(() => {
    getProducts();
  }, []);

  // ================= LOAD CART =================

  useEffect(() => {
    if (userData?._id) {
      getUserCart();
    }
  }, [userData]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    getCartItemsForOrder,
    clearCart,
  };

  return (
    <ShopDataContext.Provider value={value}>
      {children}
    </ShopDataContext.Provider>
  );
}

export default ShopContext;
