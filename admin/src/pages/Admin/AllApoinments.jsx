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
    <div className="w-full max-w-6xl mx-auto p-5 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">All Appointments</h1>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] bg-gray-100 text-gray-600 text-sm font-semibold py-3 px-6 border-b border-gray-200">
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
              className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
            >
              <p className="max-sm:hidden text-gray-700 font-medium text-sm">{index + 1}</p>

              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  src={item.userData.image}
                  alt={item.userData.name}
                />
                <p className="text-gray-600 font-medium text-sm">{item.userData.name}</p>
              </div>

              <p className="max-sm:hidden text-gray-600 text-sm">{calculateAge(item.userData.dob)}</p>

              <p className="text-gray-700 text-sm">
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>

              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
                <p className="text-gray-900 font-medium text-sm">{item.docData.name}</p>
              </div>

              <p className="text-gray-700 font-medium text-sm">
                {currency}{item.amount}
              </p>

              <div>
                {item.cancelled ? (
                  <span className="text-red-500 text-sm font-medium">Cancelled</span>
                ) : (
                  <img
                    onClick={() => cancelappointment(item._id)}
                    className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                )}
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
