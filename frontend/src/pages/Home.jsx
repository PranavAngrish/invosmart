import React from 'react'
import Header from '../components/HeaderHome'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Process from '../components/Process'
import Testimonial from '../components/Testimonial'
import CTA from '../components/CTA'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Process />
      <Testimonial />
      <CTA />
      <Footer />
    </div>
  )
}

export default Home
