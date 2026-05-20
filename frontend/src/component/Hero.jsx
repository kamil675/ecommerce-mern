import React from "react";
import { FaCircle } from "react-icons/fa";

function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    <div className="flex flex-col justify-center items-start h-full px-16 gap-8">
      {/* Text Section */}
      <div className="text-[#88d9ee] text-[22px] md:text-[40px] lg:text-[55px]">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>

      {/* Dots Section */}
      <div className="flex gap-3 cursor-pointer">
        {[0, 1, 2, 3].map((index) => (
          <FaCircle
            key={index}
            className={`w-[14px] ${
              heroCount === index ? "fill-orange-400" : "fill-white"
            }`}
            onClick={() => setHeroCount(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
