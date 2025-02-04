import React from "react";
import { 
    CpuChipIcon, 
    DocumentTextIcon, 
    ShieldCheckIcon, 
    CubeIcon 
  } from "@heroicons/react/24/outline";  // Correct path for Heroicons v2
  
  function FeatureCard({ icon: Icon, title, description }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
        <Icon className="h-12 w-12 text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }
  
  function Features() {
    const features = [
      {
        icon: CpuChipIcon,  // Replaced RobotIcon
        title: "Robotic Process Automation",
        description: "Automate repetitive tasks and streamline your workflow with cutting-edge RPA technology.",
      },
      {
        icon: DocumentTextIcon,
        title: "OCR Technology",
        description: "Extract data from invoices and documents with high accuracy using advanced OCR capabilities.",
      },
      {
        icon: ShieldCheckIcon,
        title: "Invoice Validation",
        description: "Ensure the accuracy and compliance of your invoices with our robust validation system.",
      },
      {
        icon: CubeIcon,  // Replaced CubeTransparentIcon
        title: "Blockchain Integration",
        description: "Leverage blockchain technology for secure, transparent, and immutable record-keeping.",
      },
    ];
  
    return (
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default Features;
  