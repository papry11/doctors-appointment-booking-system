import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {

  const { doctors, aToken, getAllDoctors , changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])
  

  return (
<div className="m-5 max-h-[90vh] w-full max-w-5xl">
  <h1 className="text-2xl font-semibold text-teal-600 mb-6">All Doctors</h1>

  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {doctors.map((item, index) => (
      <div
        key={index}
        className="group rounded-xl border border-gray-100 bg-white shadow-md overflow-hidden hover:shadow-lg hover:translate-y-[-6px] transition-all duration-300 cursor-pointer"
      >
        {/* Doctor Image */}
        <div className="w-full h-56 bg-gray-50 flex items-center justify-center group-hover:bg-teal-600 transition-all duration-500">
          <img
            src={item.image}
            alt={item.name}
            className="h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Doctor Info */}
        <div className="px-4 py-2 space-y-2">
          <p className="text-lg font-semibold text-gray-800">{item.name}</p>
          <p className="text-sm text-gray-500">{item.speciality}</p>

          {/* Availability Toggle */}
          <div className="flex items-center gap-1 text-xs mt-3">
            <input onChange={()=>changeAvailability(item._id)}
              type="checkbox"
              checked={item.available}
              className="w-4 h-4 accent-teal-600 cursor-pointer"
            />
            <span className="text-sm text-gray-600">Available</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default DoctorList
