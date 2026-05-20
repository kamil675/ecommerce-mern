import React from "react";
import Title from "../component/Title";
import contact from "../assets/back1.jpg";
import NewLetterBox from "../component/NewLetterBox";

function Contact() {
  return (
    <div className="w-full bg-[#0f172a] text-white">
      {/* ================= HERO TITLE ================= */}
      <div className="pt-24 pb-12 text-center">
        <Title text1={"CONTACT"} text2={" US"} />
      </div>

      {/* ================= CONTACT SECTION ================= */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side Image + Info */}
          <div className="space-y-6">
            <img
              src={contact}
              alt="contact"
              className="w-full rounded-2xl shadow-lg object-cover"
            />

            <div className="text-gray-300 space-y-2 text-sm sm:text-base">
              <p>
                <span className="font-semibold text-white">Address:</span> 123
                Main Street, City, State, Country
              </p>
              <p>
                <span className="font-semibold text-white">Phone:</span> (123)
                456-7890
              </p>
              <p>
                <span className="font-semibold text-white">Email:</span>{" "}
                support@onecart.com
              </p>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="bg-[#111827] p-8 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
              Send Us a Message
            </h2>

            <form className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Your Name"
                className="px-5 py-3 rounded-xl bg-[#1f2937] text-white outline-none 
                focus:ring-2 focus:ring-blue-500 transition"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="px-5 py-3 rounded-xl bg-[#1f2937] text-white outline-none 
                focus:ring-2 focus:ring-blue-500 transition"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="px-5 py-3 rounded-xl bg-[#1f2937] text-white outline-none 
                focus:ring-2 focus:ring-blue-500 transition resize-none"
              />

              <button
                type="submit"
                className="mt-2 py-3 rounded-xl bg-blue-600 
                hover:bg-blue-700 transition duration-300 font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ================= NEWSLETTER ================= */}
      <div className="py-16 px-6 bg-[#111827]">
        <div className="max-w-4xl mx-auto">
          <NewLetterBox />
        </div>
      </div>
    </div>
  );
}

export default Contact;
