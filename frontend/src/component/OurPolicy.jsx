import React from "react";
import Title from "./Title";
import { RiExchangeFundsFill } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center 
    bg-gradient-to-l from-[#141414] to-[#0c2025] py-20 px-5"
    >
      {/* Heading Section */}
      <div className="text-center mb-16">
        <Title text1={"OUR"} text2={" POLICY"} />
        <p className="text-[14px] md:text-[18px] text-blue-100 mt-4 max-w-2xl mx-auto">
          Customer-Friendly Policies - Committed to your Satisfaction and
          Safety.
        </p>
      </div>

      {/* Policy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl">
        {/* Card 1 */}
        <div
          className="flex flex-col items-center text-center gap-4 
        p-8 rounded-2xl bg-[#ffffff0a] backdrop-blur-md 
        hover:scale-105 transition duration-300"
        >
          <RiExchangeFundsFill className="w-12 h-12 text-[#90b9ff]" />
          <h3 className="text-xl font-semibold text-[#a5e8f7]">
            Easy Exchange Policy
          </h3>
          <p className="text-sm md:text-base text-gray-200">
            Exchange made easy — Quick, simple, and customer-friendly process.
          </p>
        </div>

        {/* Card 2 */}
        <div
          className="flex flex-col items-center text-center gap-4 
        p-8 rounded-2xl bg-[#ffffff0a] backdrop-blur-md 
        hover:scale-105 transition duration-300"
        >
          <TbRosetteDiscountCheckFilled className="w-12 h-12 text-[#90b9ff]" />
          <h3 className="text-xl font-semibold text-[#a5e8f7]">
            7 Days Return Policy
          </h3>
          <p className="text-sm md:text-base text-gray-200">
            Shop with confidence — 7 days easy return guarantee.
          </p>
        </div>

        {/* Card 3 */}
        <div
          className="flex flex-col items-center text-center gap-4 
        p-8 rounded-2xl bg-[#ffffff0a] backdrop-blur-md 
        hover:scale-105 transition duration-300"
        >
          <BiSupport className="w-12 h-12 text-[#90b9ff]" />
          <h3 className="text-xl font-semibold text-[#a5e8f7]">
            Best Customer Support
          </h3>
          <p className="text-sm md:text-base text-gray-200">
            Trusted customer support — Your satisfaction is our priority.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurPolicy;
