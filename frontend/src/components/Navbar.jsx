import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const { token, setToken , userData } = useContext(AppContext)
  
  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className="flex justify-between text-center border-b border-gray-300 text-sm mb-5 py-4">
      <NavLink to="/" className="flex gap-2 text-2xl ">
        <i className="fa-solid fa-user-doctor text-teal-600  text-4xl"></i>
        <h1 className="text-teal-800">Prescripto</h1>
      </NavLink>
      <ul className="hidden md:flex item start font-medium gap-5">
        <NavLink to="/">
          <li className="py-2">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-teal-600 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-2">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-teal-600 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-2">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-teal-600 w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="contact">
          <li className="py-2">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-teal-600 w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-2 p-2">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-teal-800 cursor-pointer hover:bg-stone-200 py-2 rounded"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-teal-800 cursor-pointer hover:bg-stone-200 py-2 rounded"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-teal-800 cursor-pointer hover:bg-stone-200 py-2 rounded"
                >
                  Log Out
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-teal-600 text-white px-8 py-3 rounded-full hidden md:block text-base cursor-pointer"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />
        {/* Mobile Menu */}
        {showMenu && (
          <div className="fixed top-0 right-0 bottom-0 w-full h-screen bg-white z-50 md:hidden transition-all">
            {/* Header with Logo and Close Button */}
            <div className="flex justify-between items-center px-5 py-6 border-b border-gray-200">
              <img src={assets.logo} alt="Logo" className="h-8" />
              <img
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                alt="Close"
                className="h-6 cursor-pointer"
              />
            </div>

            {/* Menu Links */}
            <ul className="flex flex-col gap-6 px-6 py-10 text-lg text-gray-700 font-medium">
              <NavLink
                to="/"
                onClick={() => setShowMenu(false)}
              >
                <p className="rounded py-1">Home</p>
              </NavLink>
              <NavLink
                to="/doctors"
                onClick={() => setShowMenu(false)}
              >
                <p className="py-1 rounded">All Doctors</p>
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setShowMenu(false)}
              >
                <p className="py-1 rounded">About</p>
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setShowMenu(false)}
              >
                <p className="rounded py-1">Contact</p>
              </NavLink>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
