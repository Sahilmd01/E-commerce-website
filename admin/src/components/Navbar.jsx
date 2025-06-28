import { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    setToken("");
    navigate("/");
    setShowMenu(false);
  };

  const navLinks = [
    { to: "/add", icon: assets.add_icon, text: "Add Items" },
    { to: "/list", icon: assets.order_icon, text: "List Items" },
    { to: "/orders", icon: assets.order_icon, text: "Orders" }
  ];

  return (
    <>
      {/* Top Navbar (Mobile + Desktop) */}
      <div className="flex justify-between items-center p-4 bg-white shadow-sm border-b border-gray-100 sm:ml-[18%] relative">
        {/* Left Section: Logo & Title (Visible on Mobile Only) */}
        <div className="flex items-center gap-3 sm:hidden">
          <img 
            src={assets.logo} 
            alt="Logo" 
            className="w-10 h-5 object-contain"
          />
          <h1 className="text-base sm:text-lg font-semibold">Admin Dashboard</h1>
        </div>

        {/* Desktop View: Admin Info & Logout */}
        <div className="hidden sm:flex items-center gap-4 ml-auto pr-4">
          <div className="flex items-center gap-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Admin</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>

        {/* Hamburger Menu (Mobile Only) */}
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="sm:hidden text-gray-500 hover:text-gray-700 p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar */}
      {showMenu && (
        <div className="sm:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowMenu(false)}
          ></div>
          <div className="absolute right-0 top-0 w-64 h-full bg-white shadow-lg">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button 
                onClick={() => setShowMenu(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) => 
                    `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`
                  }
                >
                  <div className={`p-2 rounded-lg ${window.location.pathname === link.to ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                    <img src={link.icon} className="w-5 h-5" alt={link.text} />
                  </div>
                  <span className="font-medium">{link.text}</span>
                </NavLink>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
              <div className="flex items-center gap-2 px-4 py-3 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Admin</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition-colors mt-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden sm:block w-[18%] min-h-screen bg-white shadow-sm border-r border-gray-100 fixed left-0 top-0">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <img 
            src={assets.logo} 
            alt="Logo" 
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-base font-semibold">Admin Dashboard</h1>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2 pt-6 pl-6 pr-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 
                `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`
              }
            >
              <div className={`p-2 rounded-lg ${window.location.pathname === link.to ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                <img src={link.icon} className="w-5 h-5" alt={link.text} />
              </div>
              <span className="font-medium">{link.text}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
