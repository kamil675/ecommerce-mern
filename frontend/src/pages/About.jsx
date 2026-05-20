import React from "react";
import Title from "../component/Title";
import about from "../assets/back4.jpg";
import NewLetterBox from "../component/NewLetterBox";

function About() {
  return (
    <div className="w-full bg-[#0f172a] text-white pb-[50px] md:pb-[0px]">
      {/* ================= HERO TITLE ================= */}
      <div className="pt-20 md:pt-28 pb-8 md:pb-12 text-center px-4">
        <Title text1={"ABOUT"} text2={" US"} />
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={about}
              alt="about"
              className="w-full max-w-[500px] rounded-2xl shadow-xl object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5 text-gray-300 text-[14px] sm:text-[16px] md:text-[17px] leading-relaxed text-center lg:text-left">
            <p>
              Welcome to OneCart, your trusted online shopping destination. We
              offer a wide range of high-quality products at competitive prices,
              ensuring a smooth and enjoyable shopping experience.
            </p>

            <p>
              Our platform is designed to be user-friendly and accessible to
              everyone. From fashion and electronics to home essentials, we
              bring together top collections from across the world.
            </p>

            <div className="mt-3">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                Our Mission
              </h3>
              <p>
                Our mission is to provide convenience, reliability, and
                excellence in every purchase — while supporting communities and
                delivering unmatched customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <div className="bg-[#111827] py-16 md:py-24 px-5 sm:px-8 md:px-12">
        <div className="text-center mb-12 md:mb-16">
          <Title text1={"WHY"} text2={" CHOOSE US"} />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Card 1 */}
          <div
            className="bg-[#ffffff0a] backdrop-blur-md p-6 md:p-8 rounded-2xl 
          hover:scale-105 transition duration-300 shadow-lg text-center sm:text-left"
          >
            <h3 className="text-lg font-semibold mb-3 text-white">
              Quality Assurance
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              We take pride in offering premium-quality products carefully
              evaluated to meet the highest standards of excellence.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="bg-[#ffffff0a] backdrop-blur-md p-6 md:p-8 rounded-2xl 
          hover:scale-105 transition duration-300 shadow-lg text-center sm:text-left"
          >
            <h3 className="text-lg font-semibold mb-3 text-white">
              Convenience
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Our intuitive platform ensures a seamless shopping experience,
              making browsing and purchasing simple and hassle-free.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="bg-[#ffffff0a] backdrop-blur-md p-6 md:p-8 rounded-2xl 
          hover:scale-105 transition duration-300 shadow-lg text-center sm:text-left"
          >
            <h3 className="text-lg font-semibold mb-3 text-white">
              24/7 Customer Support
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Our dedicated support team is always ready to assist you, ensuring
              quick solutions and complete peace of mind.
            </p>
          </div>
        </div>
      </div>

      {/* ================= NEWSLETTER ================= */}
      <div className="py-14 md:py-20 px-5 sm:px-8 md:px-12 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto">
          <NewLetterBox />
        </div>
      </div>
    </div>
  );
}

export default About;
