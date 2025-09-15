import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-teal-600 rounded-lg px-6 md:px-10 lg:px-20 py-10 text-white overflow-hidden">
      
      {/* Left Side */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </h1>

        <div className="flex items-center flex-col md:flex-row gap-3">
          <img
            src={assets.group_profiles}
            alt="Doctors"
            className="w-28"
          />
          <p className="text-sm md:text-base">
            Simply browse through our extensive list of trusted doctors, <br />
            and schedule your appointment hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          className="inline-flex items-center gap-2 bg-white text-gray-600 hover:scale-105 transition-all duration-300 font-medium px-5 py-2.5 rounded-full w-max"
        >
          Book Appointment
          <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
        </a>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 ">
        <img
          src={assets.header_img}
          alt="Hero Banner"
          className="w-full h-auto object-contain bottom-0"
        />
      </div>
    </div>
  );
};

export default Hero;