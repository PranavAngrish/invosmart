import React from "react";

function Testimonial() {
    return (
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12"></h2>
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:-translate-y-2 duration-300">
            <blockquote className="text-xl italic text-gray-700 leading-relaxed">
            </blockquote>
            <div className="mt-6 flex items-center justify-center space-x-4">
              <p className="font-semibold text-gray-800"></p>
            </div>
          </div>
        </div>
    );
  }
  
  export default Testimonial;
  