import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllApoinments from './pages/Admin/AllApoinments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorList from './pages/Admin/DoctorList'
import { DoctorContext } from './context/DoctorContext'
import Doctordashboard from './pages/Doctor/Doctordashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'


const App = () => {
  const { aToken } = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appoinments' element={<AllApoinments/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctor-list' element={<DoctorList />} />
          
          {/* Doctor Route */}

          <Route path='/doctor-dashboard' element={<Doctordashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile/>} />
        </Routes>
      </div>
    </div>
  ) : (
      <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
