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

  // 🔥 GET ALL PRODUCTS
  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list");
      setProducts(result.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 ADD TO CART
  const addToCart = async (itemId, size) => {
    if (!size) return alert("Please select size");

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItem(cartData);

    if (userData) {
      await axios.post(
        serverUrl + "/api/cart/addtocart",
        { itemId, size },
        { withCredentials: true },
      );
    }
  };

  // 🔥 GET USER CART
  const getUserCart = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/cart/getusercart",
        {},
        { withCredentials: true },
      );
      setCartItem(result.data.cartData || {});
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 UPDATE QUANTITY
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if (userData) {
      await axios.post(
        serverUrl + "/api/cart/updatecart",
        { itemId, size, quantity },
        { withCredentials: true },
      );
    }
  };

  // 🔥 CART COUNT
  const getCartCount = () => {
    let total = 0;
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        total += cartItem[productId][size];
      }
    }
    return total;
  };

  // 🔥 CART TOTAL AMOUNT
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

  // 🔥 PAYMENT KE LIYE ITEMS FORMAT
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

  // 🔥 CLEAR CART AFTER PAYMENT
  const clearCart = () => {
    setCartItem({});
  };

  // LOAD PRODUCTS
  useEffect(() => {
    getProducts();
  }, []);

  // LOAD USER CART
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
