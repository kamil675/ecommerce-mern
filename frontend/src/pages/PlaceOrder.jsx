import React, { useContext } from "react";
import axios from "axios";
import { ShopDataContext } from "../context/ShopContext";
import { AuthDataContext } from "../context/AuthContext";

function PlaceOrder() {
  const { cartItem, products, getCartAmount } = useContext(ShopDataContext);
  let { serverUrl } = useContext(AuthDataContext);

  const subTotal = getCartAmount();
  const totalAmount = subTotal + 40; // delivery_fee

  const handlePayment = async () => {
    try {
      // Step 1: Create Order Backend
      const { data } = await axios.post(
        serverUrl + "/api/payment/create-order",
        { amount: totalAmount },
      );

      // Step 2: Razorpay Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        order_id: data.id,
        name: "My E-Commerce Store",

        handler: async function (response) {
          await axios.post("http://localhost:5000/api/payment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            items: cartItem,
            totalAmount,
            userId: "USER_ID_HERE", // later dynamic karenge
          });

          alert("Payment Successful ✅");
        },

        theme: {
          color: "#06b6d4",
        },
      };
      console.log("Total Amount:", totalAmount);
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-3xl mb-6">Checkout</h1>

      <p className="mb-4">Total Amount: ₹{totalAmount}</p>

      <button
        onClick={handlePayment}
        className="bg-cyan-500 px-6 py-3 rounded-xl hover:bg-cyan-600"
      >
        Pay Now
      </button>
    </div>
  );
}

export default PlaceOrder;
