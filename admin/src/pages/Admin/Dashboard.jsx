import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, getDashData, cancelappointment, dashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) {
    return (
      <p className="text-center text-gray-400 mt-10 text-sm sm:text-base">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div className="m-4 sm:m-6 w-full max-w-3xl space-y-8 sm:space-y-10">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Doctors */}
        <div className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 backdrop-blur shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
          <img
            src={assets.doctor_icon}
            alt="Doctors"
            className="w-12 h-12 sm:w-14 sm:h-14"
          />
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
              {dashData.doctors}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">Doctors</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-purple-100 backdrop-blur shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
          <img
            src={assets.appointment_icon}
            alt="Appointments"
            className="w-12 h-12 sm:w-14 sm:h-14"
          />
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
              {dashData.appointments}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-green-50 to-green-100 backdrop-blur shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
          <img
            src={assets.patients_icon}
            alt="Patients"
            className="w-12 h-12 sm:w-14 sm:h-14"
          />
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">
              {dashData.patients}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-300">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-300 pb-2 sm:pb-3">
          <img
            src={assets.list_icon}
            alt="Latest Booking"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
          <p className="text-lg sm:text-xl font-semibold text-gray-800">
            Latest Bookings
          </p>
        </div>

        <div className="space-y-4">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border border-gray-300 bg-white hover:shadow-md transition"
            >
              {/* Doctor + Patient Info */}
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {item.docData.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Patient:{" "}
                    <span className="font-medium text-gray-700">
                      {item.userData.name}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.slotDate.replaceAll("_", "/")} • {item.slotTime}
                  </p>
                </div>
              </div>

              {/* Status / Action */}
              {item.cancelled ? (
                <span className="text-red-500 text-xs sm:text-sm font-medium">
                  Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="text-green-600 text-xs sm:text-sm font-medium">
                  Completed
                </span>
              ) : (
                <img
                  onClick={() => cancelappointment(item._id)}
                  className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
