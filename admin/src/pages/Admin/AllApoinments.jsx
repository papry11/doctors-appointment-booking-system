import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppontments, cancelappointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getAllAppontments();
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
        All Appointments
      </h1>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Header for md+ screens */}
        <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] bg-gray-100 text-gray-600 text-sm font-semibold py-3 px-4 sm:px-6 border-b border-gray-200">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointment Rows */}
        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
            >
              {/* Desktop / Tablet View */}
              <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] items-center gap-3">
                <p className="text-gray-700 text-sm">{index + 1}</p>

                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-200"
                    src={item.userData.image}
                    alt={item.userData.name}
                  />
                  <p className="text-gray-700 text-sm font-medium">{item.userData.name}</p>
                </div>

                <p className="text-gray-600 text-sm">{calculateAge(item.userData.dob)}</p>

                <p className="text-gray-700 text-sm">
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </p>

                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-200"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                  <p className="text-gray-900 text-sm font-medium">{item.docData.name}</p>
                </div>

                <p className="text-gray-700 text-sm font-medium">
                  {currency}{item.amount}
                </p>

                <div>
                  {item.cancelled ? (
                    <span className="text-red-500 text-xs sm:text-sm font-medium">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="text-green-600 text-xs sm:text-sm font-medium">Completed</span>
                  ) : (
                    <img
                      onClick={() => cancelappointment(item._id)}
                      className="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer hover:scale-110 transition-transform"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                  )}
                </div>
              </div>

              {/* Mobile View */}
              <div className="md:hidden flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    src={item.userData.image}
                    alt={item.userData.name}
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">{item.userData.name}</p>
                    <p className="text-gray-500 text-xs">Age: {calculateAge(item.userData.dob)}</p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm">
                  <span className="font-medium">Date:</span> {slotDateFormat(item.slotDate)}, {item.slotTime}
                </p>

                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                  <p className="text-gray-900 text-sm font-medium">{item.docData.name}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-700 text-sm font-medium">
                    {currency}{item.amount}
                  </p>
                  {item.cancelled ? (
                    <span className="text-red-500 text-xs sm:text-sm font-medium">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="text-green-600 text-xs sm:text-sm font-medium">Completed</span>
                  ) : (
                    <img
                      onClick={() => cancelappointment(item._id)}
                      className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="p-6 text-center text-gray-500 text-sm font-medium">
            No appointments found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
