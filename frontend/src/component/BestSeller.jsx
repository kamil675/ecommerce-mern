import React, { useEffect, useState } from "react";
import Title from "./Title";
import { useContext } from "react";
import { ShopDataContext } from "../context/ShopContext";
import Card from "./Card";

function BestSeller() {
  let { products } = useContext(ShopDataContext);
  let [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    let filteredProducts = products.filter((item) => item.bestseller === true);
    setBestSeller(filteredProducts.slice(4, 8));
  }, [products]);

  return (
    <div>
      <div className="h-[8%] w-[100%] text-center mt-[50px] ">
        <Title text1={"BEST"} text2={" SELLER"} />
        <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">
          Tried,Tested, Loved Discover Our All-Time Best Seller
        </p>
      </div>
      <div className="w-[100%] h-[50%] mt-[30px] flex item-center justify-center flex-wrap gap-[50px]">
        {bestSeller.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            image={item.image1}
            id={item._id}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
