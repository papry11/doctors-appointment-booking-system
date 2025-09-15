import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

function Doctordashboard() {
  const {
    dToken,
    dashData,
    getDashdata,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);

  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashdata();
    }
  }, [dToken, getDashdata]);

  return (
    dashData && (
      <div className="m-5">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Earnings */}
          <div className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 backdrop-blur shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <img
              src={assets.earning_icon}
              alt="Earnings Icon"
              className="w-12 h-12 sm:w-14 sm:h-14"
            />
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                {currency} {dashData.earnings}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">Earnings</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-purple-100 backdrop-blur shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <img
              src={assets.appointment_icon}
              alt="Appointments Icon"
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
              alt="Patients Icon"
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
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-300/40 mt-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 border-b border-gray-300/40 pb-2 sm:pb-3">
            <img
              src={assets.list_icon}
              alt="Latest Booking Icon"
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
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border border-gray-300/40 bg-white hover:shadow-md transition"
              >
                {/* Patient Info */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={item.userData.image || assets.default_avatar}
                    alt={item.userData.name || "Patient"}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-300/40"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      Patient:{" "}
                      <span className="font-medium text-gray-700">
                        {item.userData.name}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.slotDate.replace(/_/g, "/")} • {item.slotTime}
                    </p>
                  </div>
                </div>

                {/* Status / Actions */}
                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="p-2 rounded-full hover:bg-red-50 transition"
                      aria-label="Cancel Appointment"
                    >
                      <img
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-6 h-6"
                      />
                    </button>
                    <button
                      onClick={() => completeAppointment(item._id)}
                      className="p-2 rounded-full hover:bg-green-50 transition"
                      aria-label="Mark Appointment as Completed"
                    >
                      <img
                        src={assets.tick_icon}
                        alt="Complete"
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Doctordashboard;
