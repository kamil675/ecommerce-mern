import React, { useEffect } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { useState } from "react";
import { useContext } from "react";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";

function List() {
  let [list, setList] = useState([]);
  let { serverUrl } = useContext(AuthDataContext);

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      setList(result.data.product); // 🔥 IMPORTANT
      console.log(result.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const removeList = async (id) => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true },
      );
      if (result.data) {
        fetchList();
      } else {
        console.log("failed to remove product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white]">
      <Nav />
      <div className="w-[100%] h-[100%] flex items-center justify-start">
        <Sidebar />
        <div
          className="w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] 
        flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]"
        >
          <div className="w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px] text-white">
            All Listed Products
          </div>
          {list && list.length > 0 ? (
            list.map((item, index) => (
              <div
                key={index}
                className="w-[90%] md:h-[120px] h-[90px] bg-slate-600 rounded-xl flex
      items-center justify-between p-[10px] md:px-[30px]"
              >
                {/* Left Side (Image + Details) */}
                <div className="flex items-center gap-[15px]">
                  <img
                    src={item.image1}
                    alt=""
                    className="w-[90px] md:w-[120px] h-[80px] md:h-[100px] rounded-lg object-cover"
                  />

                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm">₹ {item.price}</p>
                    <p className="text-sm text-gray-300">{item.category}</p>
                  </div>
                </div>

                {/* ❌ Right Side Cross */}
                <button
                  onClick={() => removeList(item._id)}
                  className="text-black text-xl font-bold hover:scale-110 transition hover:text-white"
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <div>No products available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
