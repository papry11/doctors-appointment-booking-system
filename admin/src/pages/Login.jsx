import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setAToken, backendUrl } = useContext(AdminContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {


      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password })


        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          toast.success('Admin login successful')
          navigate('/admin/dashboard')
        } else {
          toast.error(data.message)
        }
      }

      if (state === 'Doctor') {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password })
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          toast.success('Doctor login successful')
          navigate('/doctor/dashboard')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      console.error(error)
    }
  }




  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <p className="text-2xl font-bold text-center text-gray-500 mb-6">
          <span className='text-teal-600'>{state} </span>Login
        </p>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-1">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-2xl font-semibold shadow-md transition duration-300"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          {state === 'Admin' ? (
            <>
              Doctor Login?{" "}
              <span onClick={() => setState('Doctor')} className="text-teal-600 hover:underline cursor-pointer font-medium">
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{" "}
              <span onClick={() => setState('Admin')} className="text-teal-600 hover:underline cursor-pointer font-medium">
                Click here
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  )
}

export default Login

