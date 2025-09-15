import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-white border-r border-gray-400/40 w-60 sm:w-64 md:w-72">
      {aToken && (
        <ul className="text-blue-950 mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 sm:px-6 md:px-9 cursor-pointer ${
                isActive
                  ? "bg-[#F8F9FD] border-r-4 border-teal-600 font-medium"
                  : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <img src={assets.home_icon} alt="" className="w-5 h-5" />
            <p className="text-sm sm:text-base">Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 sm:px-6 md:px-9 cursor-pointer ${
                isActive
                  ? "bg-[#F8F9FD] border-r-4 border-teal-600 font-medium"
                  : ""
              }`
            }
            to={"/all-appoinments"}
          >
            <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
            <p className="text-sm sm:text-base">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 sm:px-6 md:px-9 cursor-pointer ${
                isActive
                  ? "bg-[#F8F9FD] border-r-4 border-teal-600 font-medium"
                  : ""
              }`
            }
            to={"/add-doctor"}
          >
            <img src={assets.add_icon} alt="" className="w-5 h-5" />
            <p className="text-sm sm:text-base">Add Doctors</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 sm:px-6 md:px-9 cursor-pointer ${
                isActive
                  ? "bg-[#F8F9FD] border-r-4 border-teal-600 font-medium"
                  : ""
              }`
            }
            to={"/doctor-list"}
          >
            <img src={assets.people_icon} alt="" className="w-5 h-5" />
            <p className="text-sm sm:text-base">Doctors List</p>
          </NavLink>
        </ul>
      )}
       {dToken && (
        <ul className="text-blue-950 mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 sm:px-6 md:px-9 cursor-pointer ${
                isActive
                  ? "bg-[#F8F9FD] border-r-4 border-teal-600 font-medium"
                  : ""
              }`
            }
            to={"/doctor-dashboard"}
          >
            <img src={assets.home_icon} alt="" className="w-5 h-5" />
            <p className="text-sm sm:text-base">Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 sm:px-6 md:px-9 cursor-pointer ${
                isActive
                  ? "bg-[#F8F9FD] border-r-4 border-teal-600 font-medium"
                  : ""
              }`
            }
            to={"/doctor-appointments"}
          >
            <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
            <p className="text-sm sm:text-base">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 sm:px-6 md:px-9 cursor-pointer ${
                isActive
                  ? "bg-[#F8F9FD] border-r-4 border-teal-600 font-medium"
                  : ""
              }`
            }
            to={"/doctor-profile"}
          >
            <img src={assets.people_icon} alt="" className="w-5 h-5" />
            <p className="text-sm sm:text-base">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
