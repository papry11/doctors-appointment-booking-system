import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData,
    userData,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const daysOfWeek = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // fetch doctor info
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  // sample slot generator
  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;

        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    try {
      const date = docSlots[slotIndex][0]?.dateTime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          userId: userData._id,
          userData: userData,
          docId,
          slotDate,
          slotTime,
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-6 bg-white rounded-2xl shadow-md p-6">
          <img
            className="bg-teal-600 w-full rounded-2xl sm:max-w-72 object-cover"
            src={docInfo.image}
            alt=""
          />

          {/* Right: Doctor Info */}
          <div className="flex-1">
            <p className="text-3xl font-bold flex items-center gap-2 text-gray-900">
              {docInfo.name}
              <img
                src={assets.verified_icon}
                alt="Verified"
                className="w-5 h-5"
              />
            </p>

            <p className="flex items-center text-gray-600 mt-2">
              {docInfo.degree} - {docInfo.speciality}
              <span className="ml-2 bg-gray-100 px-4 py-1 rounded-full text-xs">
                {docInfo.experience}
              </span>
            </p>

            {/* About */}
            <div className="mt-4">
              <p className="font-semibold text-sm flex items-center gap-1 text-gray-800">
                About
                <img src={assets.info_icon} alt="Info" className="w-4 h-4" />
              </p>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-[700px]">
                {docInfo.about}
              </p>
            </div>

            <p className="mt-4 text-gray-700 font-medium">
              Appointment fee:{" "}
              <span className="text-teal-600 font-bold">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Booking slots
          </h3>

          {/* Day Selector */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  key={index}
                  className={`cursor-pointer text-sm flex-shrink-0 px-5 py-3 rounded-xl shadow-sm transition-all duration-200
                  ${
                    slotIndex === index
                      ? "bg-teal-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <p className="text-sm font-semibold">
                    {item[0] && daysOfWeek[item[0].dateTime.getDay()]}
                  </p>
                  <p className="text-sm">
                    {item[0] && item[0].dateTime.getDate()}
                  </p>
                </div>
              ))}
          </div>

          {/* Time Slot Selector */}
          <div className="flex flex-nowrap gap-3 mt-5 overflow-x-auto scrollbar-hide">
            {docSlots.length > 0 &&
              docSlots[slotIndex]?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`px-5 py-2 rounded-full border border-gray-300 cursor-pointer text-sm whitespace-nowrap flex-shrink-0 transition-all duration-200
          ${
            slotTime === item.time
              ? "bg-teal-600 text-white border-teal-600 shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
                >
                  {item.time}
                </div>
              ))}
          </div>

          {/* Confirm Button */}
          <div className="mt-6">
            <button
              onClick={bookAppointment}
              disabled={!slotTime}
              className={`w-full md:w-auto px-6 py-3 rounded-full text-white font-semibold shadow-md transition-all duration-200
                ${
                  slotTime
                    ? "bg-teal-600 hover:bg-teal-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
