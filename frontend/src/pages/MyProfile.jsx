import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const {userData,setUserData , token , backendUrl , loadUserProfileData} = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)
  

const updateUserProfileData = async () => {
  try {
    const formData = new FormData();

    formData.append('name', userData.name);
    formData.append('phone', userData.phone);
    formData.append('address', JSON.stringify(userData.address));
    formData.append('gender', userData.gender);
    formData.append('dob', userData.dob);

    if (image) formData.append('image', image);

    const { data } = await axios.post(
      backendUrl + '/api/user/update-profile',
      formData,
      { headers: { token } }
    );

    if (data.success) {
      toast.success(data.message);
      await loadUserProfileData();
      setIsEdit(false);
      setImage(false);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};


  return userData && (
    <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-md mt-10 space-y-6 shadow-lg border border-gray-300">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4">
        {
          isEdit
            ? <label htmlFor="image">
              <div className='inline-block relative cursor-pointer'>
                <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image):userData.image} alt="" />
                <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon } alt="" />
              </div>
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden />
            </label>
            : <img
          src={userData.image}
          alt="Profile"
          className="w-40 h-40 rounded-full border-2 border-teal-600 shadow"
        />
        }
        
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="text-xl font-semibold text-center border-b border-gray-300 focus:outline-none"
          />
        ) : (
          <h2 className="text-2xl font-bold">{userData.name}</h2>
        )}
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b border-gray-300 pb-1">Contact Information</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <p className="w-20 font-medium text-sm">Email:</p>
            <p className="text-gray-700">{userData.email}</p>
          </div>

          <div className="flex items-center gap-4">
            <p className="w-20 font-medium text-sm">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
            ) : (
              <p className="text-gray-700">{userData.phone}</p>
            )}
          </div>

          <div className="flex items-start gap-4">
            <p className="w-20 font-medium text-sm pt-1">Address:</p>
            {isEdit ? (
              <div className="space-y-2 w-full">
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  placeholder="Line 1"
                  className="border border-gray-300 rounded px-3 py-1 w-full"
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  placeholder="Line 2"
                  className="border border-gray-300 rounded px-3 py-1 w-full"
                />
              </div>
            ) : (
              <p className="text-gray-700">
                {userData.address.line1}, {userData.address.line2}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b border-gray-300 pb-1">Basic Information</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <p className="w-20 font-medium text-sm">Gender:</p>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="border border-gray-300 rounded px-3 py-1 w-full"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
            ) : (
              <p className="text-gray-700">{userData.gender}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <p className="w-20 font-medium text-sm">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
            ) : (
              <p className="text-gray-700">{userData.dob}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="text-right">
         <div className="text-right">
       {
  isEdit 
    ? <button 
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded cursor-pointer" 
        onClick={updateUserProfileData} // ✅ Corrected
      >
        Save Information
      </button>
    : <button 
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded cursor-pointer" 
        onClick={() => setIsEdit(true)}
      >
        Edit Profile
      </button>
}

      </div>
      </div>
    </div>
  );
};

export default MyProfile;
