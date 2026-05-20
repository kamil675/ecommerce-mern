import React, { useEffect } from "react";
import Title from "./Title";
import Card from "./Card";
import { useContext } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { useState } from "react";

function LatestCollection() {
  let { products } = useContext(ShopDataContext);
  let [LatestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 4));
  }, [products]);

  return (
    <div>
      <div className="h-[8%] w-[100%] text-center md:mt-[50px]">
        <Title text1={"LATEST"} text2={" COLLECTION"} />
        <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100 ">
          step into style, with the latest collection
        </p>
      </div>
      <div className="w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
        {LatestProducts.map((item, index) => (
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

export default LatestCollection;
