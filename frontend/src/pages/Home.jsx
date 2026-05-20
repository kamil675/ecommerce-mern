import React, { useState } from "react";
import Background from "../component/Background.jsx";
import Hero from "../component/Hero.jsx";
import Product from "./Product.jsx";
import OurPolicy from "../component/OurPolicy.jsx";
import NewLetterBox from "../component/NewLetterBox.jsx";
import Footer from "../component/Footer.jsx";

function Home() {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style That" },
    {
      text1: "Discover the best of Bold Fashion Fit",
      text2: "Limited Time Only!",
    },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose Your Perfect Fashion Fit", text2: "Now On Sale!" },
  ];

  const [heroCount, setHeroCount] = useState(0);

  return (
    <div className="overflow-x-hidden relative top-[70px]">
      <div className="flex w-screen lg:h-screen md:h-[50vh] bg-gradient-to-r from-[#141414] to-[#0c2025]">
        {/* LEFT SIDE - TEXT */}
        <div className="w-1/2 h-full flex items-center justify-center bg-[#141414] text-yellow-400">
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
          />
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="w-1/2 h-full flex items-end overflow-hidden">
          <Background heroCount={heroCount} />
        </div>
      </div>
      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  );
}

export default Home;
