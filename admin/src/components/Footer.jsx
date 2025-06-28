import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        {/* Top section with logo and one icon */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-indigo-600 text-white p-2 rounded-lg mr-3">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Vante & Co.</h2>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>

          {/* Only basket icon */}
          <div>
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-600 transition-colors duration-200"
            >
              <span className="sr-only">Orders</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© {year} Vante & Co. E-commerce. All rights reserved.</p>
          <p className="mt-1">
            Developed by <span className="text-indigo-600">Sahil</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
