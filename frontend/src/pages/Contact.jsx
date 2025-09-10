import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-teal-50 px-6 sm:px-12 lg:px-24 py-10 flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-xl w-full mb-8">
        <h1 className="text-4xl font-bold text-teal-700 tracking-wide">Contact Us</h1>
        <p className="text-gray-600 mt-2 text-base">We’d love to hear from you!</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-16 max-w-6xl w-full bg-white shadow-xl rounded-2xl p-8 sm:p-12 border border-gray-200">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={assets.contact_image}
            alt="Contact Visual"
            className="rounded-xl w-full max-h-96 object-cover shadow-md"
          />
        </div>

        {/* Info Section */}
        <div className="md:w-1/2 text-gray-800 flex flex-col justify-center gap-10">
          {/* Office Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">
              Our Office
            </h3>
            <address className="not-italic space-y-1 text-base text-gray-600 leading-relaxed">
              <p>Banani</p>
              <p>Dhaka, 1213</p>
              <p>
                Tel:{" "}
                <a href="tel:+88019820xxxxx" className="text-teal-600 hover:underline">
                  +88019820*****
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:prescripto@gmail.com"
                  className="text-teal-600 hover:underline"
                >
                  prescripto@gmail.com
                </a>
              </p>
            </address>
          </div>

          {/* Careers */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">
              Careers at Prescripto
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Explore job opportunities and be part of a growing team committed to healthcare innovation.
            </p>
            <button className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md shadow transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
