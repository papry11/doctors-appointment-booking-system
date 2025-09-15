import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    getappointments,
    appointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getappointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <p className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
        All Appointments
      </p>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Header (Desktop only) */}
        <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] bg-gray-100 text-gray-600 text-sm font-semibold py-3 px-4 sm:px-6 border-b border-gray-200">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Rows */}
        {appointments.length > 0 ? (
          appointments
            .slice()
            .reverse()
            .map((item, index) => (
              <div
                key={index}
                className="border-b last:border-b-0 border-gray-200"
              >
                {/* Desktop Table Row */}
                <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] items-center text-sm text-gray-700 py-3 px-4 sm:px-6">
                  <p>{index + 1}</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={item?.userData?.image || "/default-avatar.png"}
                      alt="patient"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="font-medium">
                      {item?.userData?.name || "Unknown"}
                    </p>
                  </div>
                  <p>{item?.payment ? "Online" : "Cash"}</p>
                  <p>
                    {item?.userData?.dob ? calculateAge(item.userData.dob) : "-"}
                  </p>
                  <p>
                    {slotDateFormat(item?.slotDate)} at {item?.slotTime}
                  </p>
                  <p>
                    {currency}
                    {item?.amount || 0}
                  </p>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-400 text-xs font-medium">Completed</p>
                  ) : (
                    <div className="flex gap-2">
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        className="w-8 cursor-pointer"
                        src={assets.cancel_icon}
                        alt="cancel"
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        className="w-8 cursor-pointer"
                        src={assets.tick_icon}
                        alt="complete"
                      />
                    </div>
                  )}
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden p-4 text-sm text-gray-700 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={item?.userData?.image || "/default-avatar.png"}
                      alt="patient"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">
                        {item?.userData?.name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item?.payment ? "Online" : "Cash"}
                      </p>
                    </div>
                  </div>
                  <p>
                    <span className="font-semibold">Age:</span>{" "}
                    {item?.userData?.dob ? calculateAge(item.userData.dob) : "-"}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {slotDateFormat(item?.slotDate)} at {item?.slotTime}
                  </p>
                  <p>
                    <span className="font-semibold">Fees:</span> {currency}
                    {item?.amount || 0}
                  </p>

                  <div className="mt-2">
                    {item.cancelled ? (
                      <p className="text-red-400 text-xs font-medium">
                        Cancelled
                      </p>
                    ) : item.isCompleted ? (
                      <p className="text-green-400 text-xs font-medium">
                        Completed
                      </p>
                    ) : (
                      <div className="flex gap-4">
                        <img
                          onClick={() => cancelAppointment(item._id)}
                          className="w-8 cursor-pointer"
                          src={assets.cancel_icon}
                          alt="cancel"
                        />
                        <img
                          onClick={() => completeAppointment(item._id)}
                          className="w-8 cursor-pointer"
                          src={assets.tick_icon}
                          alt="complete"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="text-center text-gray-500 py-6">No appointments found</p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
