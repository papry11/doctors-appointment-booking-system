import React from 'react'
import Hero from '../components/Hero'
import SpeciallityMenu from '../components/SpeciallityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'


const Home = () => {
  return (
    <div>
      <Hero />
      <SpeciallityMenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home
