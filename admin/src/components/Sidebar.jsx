import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="min-h-screen bg-white border-r border-gray-400/40">
      {aToken && 
        <ul className="text-blue-950 mt-5">
          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md-min-w-72 cursor-pointer ${isActive ? 'bg-[#F8F9FD] border-r-4 border-teal-600 font-medium' : ''}`} to={'/admin-dashboard' }>
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md-min-w-72 cursor-pointer ${isActive ? 'bg-[#F8F9FD] border-r-4 border-teal-600 font-medium' : ''}`} to={'/all-appoinments'}>
            <img src={assets.appointment_icon} alt="" />
            <p>Appoinments</p>
          </NavLink>
          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md-min-w-72 cursor-pointer ${isActive ? 'bg-[#F8F9FD] border-r-4 border-teal-600 font-medium' : ''}`} to={'/add-doctor'}>
            <img src={assets.add_icon} alt="" />
            <p>Add Doctors</p>
          </NavLink>
          <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md-min-w-72 cursor-pointer ${isActive ? 'bg-[#F8F9FD] border-r-4 border-teal-600 font-medium' : ''}`} to={'/doctor-list'}>
            <img src={assets.people_icon} alt="" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      }
    </div>
  );
};

export default Sidebar;
