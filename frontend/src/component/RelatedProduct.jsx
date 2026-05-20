import React, { useContext, useEffect, useState } from "react";
import { ShopDataContext } from "../context/ShopContext";
import Title from "./Title";
import Card from "./Card";

function RelatedProduct({ category, subCategory, currentProductId }) {
  const { products } = useContext(ShopDataContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // 1️⃣ Same category & subCategory
      let filtered = products
        .filter((item) => item.category === category)
        .filter((item) => item.subCategory === subCategory)
        .filter((item) => item._id !== currentProductId);

      // 2️⃣ Agar 3 se kam mile to baaki products add karo
      if (filtered.length < 3) {
        const remaining = products
          .filter((item) => item._id !== currentProductId)
          .filter((item) => !filtered.some((fItem) => fItem._id === item._id));

        filtered = [...filtered, ...remaining];
      }

      // 3️⃣ Final me 4 tak show karo (minimum 3 guaranteed)
      setRelated(filtered.slice(0, 4));
    }
  }, [products, category, subCategory, currentProductId]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      <Title text1={"RELATED"} text2={" PRODUCTS"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {related.map((item) => (
          <Card
            key={item._id}
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

export default RelatedProduct;
