import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
 const { userData, backendUrl, token , getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/user/cancel-appointment",
      { appointmentId, userId: userData._id },
      { headers: { token } }
    );

    if (data.success) {
      toast.success(data.message);
      getUserAppointments();
      getDoctorsData()
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};


  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <p className="pb-3 text-xl font-semibold text-gray-700 border-b border-gray-300">
        My Appointments
      </p>

      <div className="mt-6 space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col sm:flex-row gap-6 items-start sm:items-center"
          >
            {/* Doctor Image */}
            <div className="w-full sm:w-32 flex-shrink-0">
              <img
                src={item.docData.image}
                alt={item.docData.name}
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
              />
            </div>

            {/* Info Section */}
            <div className="flex-1 space-y-2">
              <p className="text-lg font-semibold text-gray-800">
                {item.docData.name}
              </p>
              <p className="text-sm text-teal-600 font-medium">
                {item.docData.speciality}
              </p>
              <div className="text-sm text-gray-600">
                <p>Address:</p>
                <p>
                  {item.docData.address.line1}, {item.docData.address.line2}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Action Buttons */}
            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:ml-auto w-full sm:w-auto">
              {!item.cancelled && !item.isCompleted &&
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm transition">
                  Pay Online
                </button>
              }
              {!item.cancelled && !item.isCompleted &&
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="bg-white text-gray-700 hover:bg-red-600 border border-gray-300 hover:text-white px-4 py-2 rounded-md text-sm transition"
                >
                  Cancel Appointment
                </button>
              }
              {item.cancelled && !item.isCompleted && <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-600">Appoinment Cancelled</button>}
              {item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
