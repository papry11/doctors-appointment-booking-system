import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {


  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  

  const {backendUrl , aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if (!docImg) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()

      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))

      // console log form data   
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`)
      })
      
      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
      
      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }







  return (
    <form onSubmit={onSubmitHandler} className="max-w-2xl mx-2 bg-white shadow-md rounded-xl p-6 space-y-6  mt-8">
      <p className="text-xl font-semibold text-teal-600">Add Doctor</p>

      {/* Upload Image */}
      <div className="flex flex-col items-center transition">
        <label htmlFor="doc-img" className="cursor-pointer flex justify-between gap-4 border-b border-gray-400 border-dashed items-center space-y-2">
          <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" className="w-24 h-24 object-contain opacity-70" />
          <p className="text-gray-800 text-base">Upload doctor <br /> picture</p>
        </label>
        <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left side */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold  text-gray-900">Doctor Name</p>
            <input onChange={(e)=> setName(e.target.value)} value={name}
              type="text"
              placeholder="Name"
              required
              className="mt-1 w-full px-2 py-1.5 text-sm rounded-md border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-teal-500 outline-none"
            />
          </div>
          <div>
            <p className="text-xs font-semibold  text-gray-900">Doctor Email</p>
            <input onChange={(e)=> setEmail(e.target.value)} value={email}
              type="email"
              placeholder="Email"
              required
              className="mt-1 w-full px-2 py-1.5 text-sm rounded-md border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-teal-500 outline-none"
            />
          </div>
          <div>
            <p className="text-xs font-semibold  text-gray-900">Doctor Password</p>
            <input onChange={(e)=> setPassword(e.target.value)} value={password}
              type="password"
              placeholder="Password"
              required
              className="mt-1 w-full px-2 py-1.5 text-sm rounded-md border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-teal-500 outline-none"
            />
          </div>
          <div>
            <p className="text-xs font-semibold  text-gray-900">Experience</p>
            <select onChange={(e)=> setExperience(e.target.value)} value={experience}v className="mt-1 w-full px-2 py-1.5 text-sm rounded-md border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-teal-500 outline-none">
              <option>1 year</option>
              <option>2 year</option>
              <option>3 year</option>
              <option>4 year</option>
              <option>5 year</option>
              <option>6 year</option>
              <option>7 year</option>
              <option>8 year</option>
              <option>9 year</option>
              <option>10 year+</option>
            </select>
          </div>
          <div>
            <p className="text-xs font-semibold  text-gray-900">Fees</p>
            <input  onChange={(e)=> setFees(e.target.value)} value={fees}
              type="number"
              placeholder="Fees"
              required
              className="mt-1 w-full px-2 py-1.5 text-sm rounded-md border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold  text-gray-900">Speciality</p>
            <select onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className="mt-1 w-full px-2 py-1.5 text-sm rounded-md border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-teal-500 outline-none">
              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatricians</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
          </div>
          <div>
            <p className="text-xs font-semibold  text-gray-900">Education</p>
            <input onChange={(e)=> setDegree(e.target.value)} value={degree}
              type="text"
              placeholder="Education"
              required
              className="mt-1 w-full px-2 py-1.5 text-sm rounded-md border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-teal-500 outline-none"
            />
          </div>
          <div>
            <p className="text-xs font-semibold  text-gray-900">Address</p>
            <input onChange={(e)=> setAddress1(e.target.value)} value={address1}
              type="text"
              placeholder="Address 1"
              required
              className="mt-1 w-full px-2 py-1.5 text-sm rounded-md border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-teal-500 outline-none"
            />
            <input onChange={(e)=> setAddress2(e.target.value)} value={address2}
              type="text"
              placeholder="Address 2"
              required
              className="mt-2 w-full px-2 py-1.5 text-sm rounded-md border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold  text-gray-900">About Doctor</p>
        <textarea onChange={(e)=> setAbout(e.target.value)} value={about}
          rows={3}
          placeholder="Write about doctor"
          required
          className="mt-1 w-full px-2 py-1.5 text-sm rounded-md border border-gray-200 bg-gray-50 focus:ring-1 focus:ring-teal-500 outline-none"
        />
      </div>

      <div className="flex justify-start">
        <button
          type="submit"
          className="px-5 py-1.5 bg-teal-600 text-white text-sm font-semibold rounded-md shadow hover:bg-teal-700 transition"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
