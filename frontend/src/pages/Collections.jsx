import React, { useEffect, useState, useContext } from "react";
import { FaAngleRight } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Title from "../component/Title";
import Card from "../component/Card";
import { ShopDataContext } from "../context/ShopContext";

function Collections() {
  const [show, setShow] = useState(false);
  const { products, search, showSearch } = useContext(ShopDataContext);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevent");

  // Toggle Category
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  // Toggle SubCategory
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  // Apply Filter + Sorting
  const applyFilter = () => {
    let productCopy = [...products];

    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter(
        (item) => subCategory.includes(item.subCategory), // ⚠️ Confirm DB key
      );
    }

    if (sortType === "low-high") {
      productCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productCopy.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(productCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortType, products, search, showSearch]);

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] 
    flex flex-col md:flex-row pt-[70px] overflow-x-hidden"
    >
      {/* ================= SIDEBAR ================= */}
      <div
        className="w-full md:w-[30%] lg:w-[20%] 
      md:min-h-screen p-[20px] border-r border-gray-400 
      text-[#aaf5fa] lg:sticky lg:top-[70px]"
      >
        <p
          className="text-[25px] font-semibold flex gap-[5px] items-center cursor-pointer"
          onClick={() => setShow((prev) => !prev)}
        >
          FILTERS
          {!show && <FaAngleRight className="text-[18px] md:hidden" />}
          {show && <MdKeyboardArrowDown className="text-[18px] md:hidden" />}
        </p>

        {/* CATEGORY */}
        <div
          className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md
          bg-slate-600 ${show ? "" : "hidden"} md:block`}
        >
          <p className="text-[18px] text-white">CATEGORIES</p>

          <div className="flex flex-col gap-[10px] mt-3">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex gap-[10px] text-[16px]">
                <input type="checkbox" value={cat} onChange={toggleCategory} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SUB CATEGORY */}
        <div
          className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 
          rounded-md bg-slate-600 ${show ? "" : "hidden"} md:block`}
        >
          <p className="text-[18px] text-white">SUB_CATEGORIES</p>

          <div className="flex flex-col gap-[10px] mt-3">
            {["TopWear", "BottomWear", "WinterWear"].map((sub) => (
              <label key={sub} className="flex gap-[10px] text-[16px]">
                <input
                  type="checkbox"
                  value={sub}
                  onChange={toggleSubCategory}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ================= PRODUCTS SECTION ================= */}
      <div className="w-full lg:w-[80%]">
        {/* Header + Sort */}
        <div
          className="w-full p-[20px] flex flex-col lg:flex-row 
        justify-between gap-[10px]"
        >
          <Title text1={"ALL"} text2={" COLLECTIONS"} />

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="text-white bg-slate-600 w-[60%] md:w-[200px] 
            h-[50px] px-[10px] rounded-lg border-2 hover:border-[#46d1f7]"
          >
            <option value="relevent">Sort By : Relevant</option>
            <option value="low-high">Sort By : Low to High</option>
            <option value="high-low">Sort By : High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div
          className="w-full min-h-[70vh] 
        flex flex-wrap justify-center gap-[30px] p-[20px]"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <Card
                key={item._id}
                name={item.name}
                image={item.image1}
                id={item._id}
                price={item.price}
              />
            ))
          ) : (
            <p className="text-white text-[20px] mt-10">No Products Found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collections;
