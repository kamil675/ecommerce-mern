import React, { useState } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import upload from "../assets/upload image.jpg";
import { useContext } from "react";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";

function Add() {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  let { serverUrl } = useContext(AuthDataContext);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      if (!image1 || !image2 || !image3 || !image4) {
        alert("All images are required");
        return;
      }

      if (!name || !description || !price) {
        alert("All fields are required");
        return;
      }
      let formData = new FormData();
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

      let result = await axios.post(
        serverUrl + "/api/product/addproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
     
        },
      );
      console.log(result.data);

      if (result.data) {
        alert("Product Added Successfully");
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("TopWear");
        setSizes([]);
        setBestseller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden relative">
      <Nav />
      <Sidebar />

      <div className="w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[5%]">
        <form
          onSubmit={handleAddProduct}
          className="w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]"
        >
          <div className="w-[400px] h-[50px] text-[25px] md:text-[40px]">
            Add Product Page
          </div>

          {/* Upload Images */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Upload Images *
            </p>

            <div className="flex gap-[15px] flex-wrap">
              {[image1, image2, image3, image4].map((img, index) => (
                <label
                  key={index}
                  className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] cursor-pointer"
                >
                  <img
                    src={!img ? upload : URL.createObjectURL(img)}
                    alt=""
                    className="w-full h-full rounded-lg border-2 hover:border-[#46d1f7]"
                  />
                  <input
                    type="file"
                    hidden
                    required
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (index === 0) setImage1(file);
                      if (index === 1) setImage2(file);
                      if (index === 2) setImage3(file);
                      if (index === 3) setImage4(file);
                    }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Name *
            </p>
            <input
              type="text"
              placeholder="Type Here"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[600px] max-w-[98%] h-[40px] rounded-lg border-2 bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2] hover:border-[#46d1f7]"
            />
          </div>

          {/* Description */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Description *
            </p>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type Here"
              className="w-[600px] max-w-[98%] h-[100px] rounded-lg border-2 bg-slate-600 px-[20px] py-[12px] text-[18px] placeholder:text-[#ffffffc2] hover:border-[#46d1f7] resize-none outline-none"
            ></textarea>
          </div>

          {/* Category & Subcategory */}
          <div className="w-[80%] flex flex-wrap gap-[20px]">
            <div className="flex flex-col gap-[10px]">
              <p className="text-[20px] font-semibold">Category *</p>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-slate-600 px-[10px] py-[7px] rounded-lg border-2 hover:border-[#46d1f7]"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className="flex flex-col gap-[10px]">
              <p className="text-[20px] font-semibold">Sub-Category *</p>
              <select
                required
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="bg-slate-600 px-[10px] py-[7px] rounded-lg border-2 hover:border-[#46d1f7]"
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="w-[80%] flex flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Price *
            </p>
            <input
              type="number"
              required
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="₹"
              className="w-[600px] max-w-[98%] h-[40px] rounded-lg border-2 bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2] hover:border-[#46d1f7]"
            />
          </div>
          {/* Product Size */}
          <div className="w-[80%] flex flex-col gap-[15px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Size *
            </p>

            <div className="flex flex-wrap gap-[15px]">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size],
                    )
                  }
                  className={`w-[70px] h-[45px] flex items-center justify-center 
        rounded-lg border-2 cursor-pointer text-[18px] font-medium
        transition-all duration-300
        ${
          sizes.includes(size)
            ? "bg-[#46d1f7] border-[#46d1f7] text-black"
            : "bg-slate-600 border-slate-500 hover:border-[#46d1f7]"
        }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className="w-[80%] flex items-center justify-start gap-[10px] mt-[20px] ">
            <input
              type="checkbox"
              id="checkbox"
              className="w-[25px] h-[25px] cursor-pointer"
              onChange={() => setBestseller((prev) => !prev)}
              checked={bestseller}
            />
            <label
              htmlFor="checkbox"
              className="text-[18px] md:text-[22px] font-semibold"
            >
              Add to BestSeller
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-[140px] h-[20px] py-[20px] rounded-xl bg-[#65d8f7] flex
             items-center justify-center gap-[10px] text-black active:bg-slate-700 active:text-white"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
