import React from "react"

function Hero() {
    return (
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down">
            Revolutionize Your Digital Processing
          </h1>
          <p className="text-xl md:text-2xl mb-12 animate-fade-in-up">
            Harness the power of RPA, OCR, and Blockchain for seamless invoice validation and tax compliance.
          </p>
          <a
            href="/invoice"
            className="bg-white text-blue-600 py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get Started
          </a>
        </div>
      </section>
    )
  }
  
  export default Hero
  
  