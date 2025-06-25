import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    searchVisible,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium bg-white shadow-sm px-4 md:px-8 sticky top-0 z-50">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-36 hover:opacity-80 transition-opacity" />
      </Link>
      
      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-8 text-gray-700 text-lg">
        <NavLink 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 hover:text-black transition-colors ${isActive ? "text-black" : ""}`
          } 
          to="/"
        >
          <p>Home</p>
          <hr className={`w-2/4 border-none h-[2px] bg-black ${visible ? "block" : "hidden"}`} />
        </NavLink>
        <NavLink 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 hover:text-black transition-colors ${isActive ? "text-black" : ""}`
          } 
          to="/collection"
        >
          <p>Collection</p>
          <hr className={`w-2/4 border-none h-[2px] bg-black ${visible ? "block" : "hidden"}`} />
        </NavLink>
        <NavLink 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 hover:text-black transition-colors ${isActive ? "text-black" : ""}`
          } 
          to="/about"
        >
          <p>About</p>
          <hr className={`w-2/4 border-none h-[2px] bg-black ${visible ? "block" : "hidden"}`} />
        </NavLink>
        <NavLink 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 hover:text-black transition-colors ${isActive ? "text-black" : ""}`
          } 
          to="/contact"
        >
          <p>Contact</p>
          <hr className={`w-2/4 border-none h-[2px] bg-black ${visible ? "block" : "hidden"}`} />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        {searchVisible && (
          <button 
            onClick={() => setShowSearch(true)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <img
              src={assets.search_icon}
              alt="Search Icon"
              className="w-5"
            />
          </button>
        )}
        
        <div className="group relative">
          <button 
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => (token ? null : navigate("/login"))}
            aria-label="Profile"
          >
            <img
              src={assets.profile_icon}
              alt="Profile Icon"
              className="w-5"
            />
          </button>
          
          {/* Dropdown Menu */}
          {token && (
            <div className="absolute right-0 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-600 rounded-lg shadow-lg border border-gray-100">
                <p 
                  className="cursor-pointer hover:text-black transition-colors"
                  onClick={() => navigate("/profile")}
                >
                  My Profile
                </p>
                <p
                  className="cursor-pointer hover:text-black transition-colors"
                  onClick={() => navigate("/orders")}
                >
                  Orders
                </p>
                <p 
                  className="cursor-pointer hover:text-black transition-colors" 
                  onClick={logout}
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        
        <Link 
          to="/cart" 
          className="relative p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Cart"
        >
          <img src={assets.cart_icon} alt="Cart Icon" className="w-5" />
          {getCartCount() > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-500 text-white aspect-square rounded-full text-[10px] font-bold">
              {getCartCount()}
            </p>
          )}
        </Link>
        
        <button 
          className="p-1 rounded-full hover:bg-gray-100 transition-colors sm:hidden"
          onClick={() => setVisible(true)}
          aria-label="Menu"
        >
          <img src={assets.menu_icon} className="w-5" alt="Menu" />
        </button>
      </div>
      
      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-white z-50 transition-all duration-300 ease-in-out ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col h-full">
          <div
            className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50"
            onClick={() => setVisible(false)}
          >
            <img
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
              className="h-4 rotate-180"
            />
            <p className="text-lg">Close Menu</p>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <NavLink
              className={({ isActive }) => 
                `block py-5 px-6 border-b hover:bg-gray-50 transition-colors ${isActive ? "bg-gray-50 font-semibold" : ""}`
              }
              onClick={() => setVisible(false)}
              to="/"
            >
              <p className="text-lg">Home</p>
            </NavLink>
            <NavLink
              className={({ isActive }) => 
                `block py-5 px-6 border-b hover:bg-gray-50 transition-colors ${isActive ? "bg-gray-50 font-semibold" : ""}`
              }
              onClick={() => setVisible(false)}
              to="/collection"
            >
              <p className="text-lg">Collection</p>
            </NavLink>
            <NavLink
              className={({ isActive }) => 
                `block py-5 px-6 border-b hover:bg-gray-50 transition-colors ${isActive ? "bg-gray-50 font-semibold" : ""}`
              }
              onClick={() => setVisible(false)}
              to="/about"
            >
              <p className="text-lg">About</p>
            </NavLink>
            <NavLink
              className={({ isActive }) => 
                `block py-5 px-6 border-b hover:bg-gray-50 transition-colors ${isActive ? "bg-gray-50 font-semibold" : ""}`
              }
              onClick={() => setVisible(false)}
              to="/contact"
            >
              <p className="text-lg">Contact</p>
            </NavLink>
          </div>
          
          {token && (
            <div className="p-5 border-t">
              <button
                className="w-full py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                onClick={() => {
                  logout();
                  setVisible(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;