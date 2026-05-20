import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopDataContext } from "../context/ShopContext";
import { AuthDataContext } from "../context/AuthContext";
import { IoStarSharp, IoStarOutline } from "react-icons/io5";
import { RiStarHalfFill } from "react-icons/ri";
import RelatedProduct from "../component/RelatedProduct";

function ProductDetail() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopDataContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      setImage(found.image1);
    }
  }, [productId, products]);

  if (!productData)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="mt-[50px] min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 md:px-12 py-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* LEFT THUMBNAILS */}
        <div className="flex lg:flex-col gap-4 overflow-x-auto">
          {[
            productData.image1,
            productData.image2,
            productData.image3,
            productData.image4,
          ]
            .filter(Boolean)
            .map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setImage(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  image === img ? "border-yellow-400" : "border-gray-700"
                } hover:scale-105 transition`}
              />
            ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={image}
            className="w-full max-w-md h-[380px] object-contain rounded-2xl shadow-xl"
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-xl">
              {[1, 2, 3, 4, 5].map((star) => {
                const rating = productData.rating || 4.5;
                if (rating >= star)
                  return <IoStarSharp key={star} className="text-yellow-400" />;
                else if (rating >= star - 0.5)
                  return (
                    <RiStarHalfFill key={star} className="text-yellow-400" />
                  );
                else
                  return <IoStarOutline key={star} className="text-gray-600" />;
              })}
            </div>
            <span className="text-gray-400 text-sm">
              {(productData.rating || 4.5).toFixed(1)} (124 reviews)
            </span>
          </div>

          <p className="text-2xl text-yellow-400 font-semibold">
            {currency} {productData.price}
          </p>

          <p className="text-gray-400 leading-relaxed">
            {productData.description}
          </p>

          {/* Size */}
          <div>
            <h3 className="font-semibold mb-2">Select Size</h3>
            <div className="flex gap-3 flex-wrap">
              {[...(productData.sizes || []), "XL"]
                .filter((v, i, s) => s.indexOf(v) === i)
                .map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setSize(item)}
                    className={`px-4 py-2 border rounded-lg ${
                      size === item
                        ? "bg-yellow-400 text-black border-yellow-400"
                        : "border-gray-600 hover:border-yellow-400"
                    }`}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>

          <button
            className="w-full md:w-[50%] bg-yellow-400 text-black font-semibold py-3 rounded-xl
             hover:bg-yellow-300 transition"
            onClick={() => addToCart(productData._id, size)}
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16 max-w-5xl mx-auto">
        <div className="flex gap-6 border-b border-gray-700 pb-3">
          <button
            onClick={() => setActiveTab("description")}
            className={`${
              activeTab === "description"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400"
            } pb-2`}
          >
            Description
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`${
              activeTab === "reviews"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400"
            } pb-2`}
          >
            Reviews (124)
          </button>
        </div>

        <div className="mt-6 text-gray-400 leading-relaxed">
          {activeTab === "description" ? (
            <p>
              Premium quality fabric with long durability. Comfortable fit for
              all-day wear. Easy wash & fade resistant.
            </p>
          ) : (
            <p>⭐ Great product! Highly recommended.</p>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  );
}

export default ProductDetail;
