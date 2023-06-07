import React from 'react'
import Hero from '../components/hero/Hero'
import About from '../components/about/About'
import WhySection from '../components/why/WhySection'
import Footer from '../components/footer/Footer'

function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhySection />
      <Footer />
    </>
  )
}

export default Home