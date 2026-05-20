import React, { useEffect } from "react";
import Title from "../component/Title";
import { useContext, useState } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { IoTrashBinSharp } from "react-icons/io5";
import CartTotal from "../component/CartTotal";

function Cart() {
  const { products, currency, cartItem, updateQuantity } =
    useContext(ShopDataContext);
  const [cartData, setCartData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-6 py-10">
      {/* Title */}
      <div className="mb-10 text-center">
        <Title text1={"YOUR"} text2={" CART"} />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE - Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartData.length === 0 ? (
            <div className="text-center text-gray-400 text-lg py-20">
              Your cart is empty 🛒
            </div>
          ) : (
            cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id,
              );

              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center justify-between 
                bg-white/5 backdrop-blur-md 
                border border-gray-700 
                rounded-2xl p-5 
                shadow-md hover:shadow-xl 
                transition-all duration-300"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-5 w-full md:w-[65%]">
                    <img
                      src={productData.image1}
                      alt={productData.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />

                    <div>
                      <p className="text-lg font-semibold">
                        {productData.name}
                      </p>

                      <p className="text-cyan-400 font-medium mt-1">
                        {currency} {productData.price}
                      </p>

                      <p className="text-gray-400 text-sm mt-1">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>

                  {/* Quantity + Delete */}
                  <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <input
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      className="w-20 px-3 py-2 
                    bg-gray-800 border border-gray-600 
                    rounded-lg text-center 
                    focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      onChange={(e) =>
                        e.target.value === "" || e.target.value === "0"
                          ? null
                          : updateQuantity(
                              item._id,
                              item.size,
                              Number(e.target.value),
                            )
                      }
                    />

                    <IoTrashBinSharp
                      className="text-2xl text-red-400 cursor-pointer 
                    hover:text-red-600 
                    hover:scale-110
                    transition duration-300"
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RIGHT SIDE - Cart Summary */}
        <div
          className="bg-white/5 backdrop-blur-md 
      border border-gray-700 
      rounded-2xl p-6 shadow-lg h-fit"
        >
          <CartTotal />

          <button
            className="w-full mt-6 
          bg-cyan-500 hover:bg-cyan-600 
          text-white font-semibold 
          py-3 rounded-xl 
          transition-all duration-300 
          hover:shadow-lg hover:shadow-cyan-500/30"
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder");
              } else {
                console.log("Your cart is empty");
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
