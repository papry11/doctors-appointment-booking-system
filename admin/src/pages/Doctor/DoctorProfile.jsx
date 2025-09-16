import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData ,  backendUrl  } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  const updateProfile = async () => {
    try {
        
      const updatedata = {
        address: profileData.address,
        fees: profileData.fees,
        available:profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updatedata, { headers: { dToken } })
      
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
        
      } catch (error) {
      toast.error(error.message)
      console.log(error)
      }
    setIsEdit(false)
  }

  return profileData && (
    <div className="p-6 flex justify-center w-full max-w-3xl">
      <div className=" bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl shadow-md p-8">
        
        {/* Top Section */}
        <div className="flex flex-col items-center text-center gap-4">
          <img 
            src={profileData.image} 
            alt={profileData.name} 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-teal-600 shadow"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
            <p className="text-gray-600 font-semibold">{profileData.degree} • {profileData.speciality}</p>
            <p className="mt-2 inline-block px-4 py-1 rounded-full bg-teal-600 text-white text-sm shadow-sm">
              {profileData.experience} experience
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* About */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">About</h3>
          {isEdit ? (
            <textarea
              value={profileData.about}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, about: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-500"
            />
          ) : (
            <p className="text-gray-600 text-base leading-relaxed">{profileData.about}</p>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Appointment Fee</p>
            {isEdit ? (
              <input
                type="number"
                value={profileData.fees}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                }
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-500"
              />
            ) : (
              <p className="text-green-600 font-bold text-lg">
                {currency} {profileData.fees}
              </p>
            )}
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500">Availability</p>
            <div className="flex items-center gap-2 mt-2">
              {isEdit ? (
                <input
                  type="checkbox"
                  checked={profileData.available}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, available: e.target.checked }))
                  }
                  className="w-4 h-4 accent-teal-600"
                />
              ) : (
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    profileData.available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {profileData.available ? 'Available' : 'Not Available'}
                </span>
              )}
              {isEdit && <label className="text-gray-700">Available</label>}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Address</h3>
          {isEdit ? (
            <div className="space-y-2 mt-2">
              <input
                type="text"
                value={profileData.address.line1}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                value={profileData.address.line2}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-teal-500"
              />
            </div>
          ) : (
            <p className="text-gray-600 mt-1 leading-relaxed">
              {profileData.address.line1} <br />
              {profileData.address.line2}
            </p>
          )}
        </div>

        {/* Action */}
        <div className="mt-8 flex justify-center">
          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 shadow-md transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
