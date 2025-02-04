import React,{ useState } from "react"

function HeaderHome() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">Invosmart</div>
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-800 hover:text-blue-600">
              Home
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600">
              Features
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600">
              Process
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600">
              Contact
            </a>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden mt-2 py-2 bg-white">
            <a href="#" className="block px-2 py-1 text-gray-800 hover:bg-gray-200">
              Home
            </a>
            <a href="#" className="block px-2 py-1 text-gray-800 hover:bg-gray-200">
              Features
            </a>
            <a href="#" className="block px-2 py-1 text-gray-800 hover:bg-gray-200">
              Process
            </a>
            <a href="#" className="block px-2 py-1 text-gray-800 hover:bg-gray-200">
              Contact
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}

export default HeaderHome

