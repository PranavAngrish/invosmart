import React from "react";


function ProcessStep({ number, title, description }) {
    return (
      <div className="flex items-start mb-8">
        <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
          {number}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    );
  }
  
  function Process() {
    const steps = [
      {
        title: "Document Upload",
        description: "Easily upload your invoices and documents through our user-friendly interface.",
      },
      {
        title: "OCR Extraction",
        description: "Our advanced OCR technology extracts relevant data from your documents with high accuracy.",
      },
      {
        title: "RPA Processing",
        description: "Automated bots process the extracted data, applying business rules and validations.",
      },
      {
        title: "Blockchain Recording",
        description: "Processed data is securely recorded on the blockchain for immutability and transparency.",
      },
      {
        title: "Tax Compliance Check",
        description: "Our system ensures your processed invoices comply with the latest tax regulations.",
      },
    ];
  
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Process</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {steps.map((step, index) => (
              <ProcessStep key={index} number={index + 1} {...step} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default Process;
  