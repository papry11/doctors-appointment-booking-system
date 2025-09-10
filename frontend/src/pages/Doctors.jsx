import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [showFilter,SetShowFilter] = useState(false)
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(
          (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
        )
      );
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-xl font-medium mb-6">
        Browse through the doctors specialist.
      </p>

      <div className="flex flex-col sm:flex-row gap-10 items-start mt-5">
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-teal-600 text-white' : ''}`} onClick={()=>SetShowFilter(prev => !prev)}>Filters</button>
        {/* Speciality List */}
        <div className={`flex flex-col gap-4 text-sm text-gray-600 w-full sm:w-1/4 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p
            onClick={() => navigate("/doctors/General physician")}
            className={`cursor-pointer border border-gray-300 px-4 py-2 rounded-md transition ${
              speciality === "General physician"
                ? "bg-teal-600 text-white"
                : ""
            }`}
          >
            General physician
          </p>
          <p
            onClick={() => navigate("/doctors/Gynecologist")}
            className={`cursor-pointer border border-gray-300 px-4 py-2 rounded-md transition ${
              speciality === "Gynecologist"
                ? "bg-teal-600 text-white"
                : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() => navigate("/doctors/Dermatologist")}
            className={`cursor-pointer border border-gray-300 px-4 py-2 rounded-md transition ${
              speciality === "Dermatologist"
               ? "bg-teal-600 text-white"
                : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() => navigate("/doctors/Pediatricians")}
            className={`cursor-pointer border border-gray-300 px-4 py-2 rounded-md transition ${
              speciality === "Pediatricians"
                ? "bg-teal-600 text-white"
                : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() => navigate("/doctors/Neurologist")}
            className={`cursor-pointer border border-gray-300 px-4 py-2 rounded-md transition ${
              speciality === "Neurologist"
                ? "bg-teal-600 text-white"
                : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() => navigate("/doctors/Gastroenterologist")}
            className={`cursor-pointer border border-gray-300 px-4 py-2 rounded-md transition ${
              speciality === "Gastroenterologist"
                ? "bg-teal-600 text-white"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="h-full flex flex-col justify-between rounded-xl border border-blue-100 bg-blue-50 overflow-hidden shadow-sm hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h- object-contain p-4 bg-blue-50"
              />
              <div className="px-4 py-4 bg-white">
                <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500 inline-block"></span>{" "}
                  Available
                </p>
                <p className="font-semibold mt-1">{item.name}</p>
                <p className="text-sm text-gray-500">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
