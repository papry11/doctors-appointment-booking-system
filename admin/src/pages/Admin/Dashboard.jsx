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
    return <p className="text-center text-gray-400 mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="m-5 space-y-10">
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Doctors */}
        <div className="flex items-center gap-5 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 backdrop-blur shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
          <img src={assets.doctor_icon} alt="Doctors" className="w-14 h-14" />
          <div>
            <p className="text-3xl font-bold text-gray-800">{dashData.doctors}</p>
            <p className="text-gray-600">Doctors</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="flex items-center gap-5 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-purple-100 backdrop-blur shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
          <img src={assets.appointment_icon} alt="Appointments" className="w-14 h-14" />
          <div>
            <p className="text-3xl font-bold text-gray-800">{dashData.appointments}</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center gap-5 p-6 rounded-2xl bg-gradient-to-r from-green-50 to-green-100 backdrop-blur shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
          <img src={assets.patients_icon} alt="Patients" className="w-14 h-14" />
          <div>
            <p className="text-3xl font-bold text-gray-800">{dashData.patients}</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>
      </div>
{/* Latest Bookings */}
<div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 border border-gray-300">
  <div className="flex items-center gap-3 mb-6 border-b border-gray-300 pb-3">
    <img src={assets.list_icon} alt="Latest Booking" className="w-8 h-8" />
    <p className="text-xl font-semibold text-gray-800">Latest Bookings</p>
  </div>

  <div className="space-y-4">
    {dashData.latestAppointments.map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-4 rounded-xl border border-gray-300 bg-white hover:shadow-md transition"
      >
        {/* Doctor + Patient Info */}
        <div className="flex items-center gap-4">
          <img
            src={item.docData.image}
            alt={item.docData.name}
            className="w-12 h-12 rounded-full object-cover border border-gray-300"
          />
          <div>
            <p className="font-semibold text-gray-800">{item.docData.name}</p>
            <p className="text-sm text-gray-500">
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
          <span className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full border border-gray-300">
            Cancelled
          </span>
        ) : (
          <img
            onClick={() => cancelappointment(item._id)}
            className="w-8 cursor-pointer hover:scale-110 transition"
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
