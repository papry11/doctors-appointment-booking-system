import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-6 my-15 text-gray-900 md:mx-10'>
      <h1 className='text-gray-700 text-3xl font-semibold'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm text-gray-600'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => item.available && navigate(`/appointment/${item._id}`)} 
            key={index}
            className='rounded-xl border border-teal-100 bg-blue-50 overflow-hidden shadow-sm hover:translate-y-[-10px] transition-all duration-500 cursor-pointer'
          >
            <img
              src={item.image}
              alt={item.name}
              className='w-full h-64 object-contain bg-blue-50'
            />
            <div className='px-4 py-4 bg-white'>
              {item.available ? (
                <p className='text-sm text-green-600 font-medium flex items-center gap-1'>
                  <span className='h-2 w-2 rounded-full bg-green-500 inline-block'></span> Available
                </p>
              ) : (
                <p className='text-sm text-red-600 font-medium flex items-center gap-1'>
                  <span className='h-2 w-2 rounded-full bg-red-500 inline-block'></span> Unavailable
                </p>
              )}
              <p className='font-semibold mt-1'>{item.name}</p>
              <p className='text-sm text-gray-500'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/doctors')
          scrollTo(0, 0)
        }}
        className='mt-10 px-12 py-3 bg-blue-100 text-gray-800 rounded-full border border-gray-300 hover:bg-blue-200 cursor-pointer'
      >
        More
      </button>
    </div>
  )
}

export default TopDoctors
