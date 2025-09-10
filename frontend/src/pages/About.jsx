import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-20">
      {/* Title Section */}
      <div className="text-center text-3xl mb-6">
        <h1 className="text-gray-700">About Us</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Left Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={assets.about_image}
            alt="Clothing, coffee, and phone on a bed"
            className="rounded-xl shadow-md w-full max-w-md object-cover"
          />
        </div>

        {/* Right Text Content */}
        <div className="md:w-1/2 text-gray-600 space-y-6 text-sm font-light leading-relaxed">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-2 border-b border-gray-400 pb-1 max-w-max">
              Our Vision
            </h3>
            <p>
              Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>
      {/* why choose us section */}
      <div className="text-xl my-4">
        <h1 className="text-gray-700 font-semibold my-8">WHY CHOOSE US</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-1">
          <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-teal-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b>EFFECIENCY</b>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-teal-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b>EFFECIENCY</b>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-teal-600 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b>EFFECIENCY</b>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
