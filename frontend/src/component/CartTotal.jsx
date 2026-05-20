import React, { useContext } from "react";
import Title from "./Title";
import { ShopDataContext } from "../context/ShopContext";

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopDataContext);

  const subTotal = getCartAmount();
  const total = subTotal === 0 ? 0 : subTotal + delivery_fee;

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-6">
        <Title text1={"CART"} text2={" TOTAL"} />
      </div>

      {/* Summary Box */}
      <div
        className="bg-white/5 backdrop-blur-md 
        border border-gray-700 
        rounded-2xl p-6 
        space-y-4 text-sm"
      >
        {/* Subtotal */}
        <div className="flex justify-between items-center text-gray-300">
          <p>Subtotal</p>
          <p className="font-medium text-white">
            {currency} {subTotal}.00
          </p>
        </div>

        <hr className="border-gray-700" />

        {/* Shipping */}
        <div className="flex justify-between items-center text-gray-300">
          <p>Shipping Fee</p>
          <p className="font-medium text-white">
            {currency} {delivery_fee}
          </p>
        </div>

        <hr className="border-gray-700" />

        {/* Total */}
        <div className="flex justify-between items-center text-lg font-semibold text-cyan-400">
          <p>Total</p>
          <p>
            {currency} {total}.00
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
