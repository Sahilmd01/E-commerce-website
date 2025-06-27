import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchInputRef = useRef(null);
  const profileRef = useRef(null);

  const {
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
    performSearch,
    searchQuery,
    setSearchQuery,
    showSearchBar,
    setShowSearchBar,
  } = useContext(ShopContext);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
    setCartItems({});
    setProfileOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      navigate("/search");
      setShowSearchBar(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search bar if clicked outside
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSearchBar(false);
      }
      // Close profile dropdown if clicked outside
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showSearchBar && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchBar]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Collection", path: "/collection" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className="flex items-center justify-between py-5 font-medium bg-white shadow-sm px-4 md:px-8 sticky top-0 z-50">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="w-36 hover:opacity-80 transition-opacity" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex gap-8 text-gray-700 text-lg">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 hover:text-black transition-colors ${isActive ? "text-black" : ""}`
              }
            >
              <p>{label}</p>
            </NavLink>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Search Toggle Button */}
          <button
            onClick={() => setShowSearchBar(!showSearchBar)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle Search"
          >
            <img src={assets.search_icon} alt="Search" className="w-5" />
          </button>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => {
                if (token) {
                  setProfileOpen(!profileOpen);
                } else {
                  navigate("/login");
                }
              }}
              aria-label="Profile"
            >
              <img src={assets.profile_icon} alt="Profile" className="w-5" />
            </button>
            {token && profileOpen && (
              <div className="absolute right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-600 rounded-lg shadow-lg border border-gray-100">
                  <p 
                    onClick={() => {
                      navigate("/profile");
                      setProfileOpen(false);
                    }} 
                    className="cursor-pointer hover:text-black"
                  >
                    My Profile
                  </p>
                  <p 
                    onClick={() => {
                      navigate("/orders");
                      setProfileOpen(false);
                    }} 
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>
                  <p 
                    onClick={logout} 
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative p-1 rounded-full hover:bg-gray-100 transition-colors" aria-label="Cart">
            <img src={assets.cart_icon} alt="Cart" className="w-5" />
            {getCartCount() > 0 && (
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-500 text-white aspect-square rounded-full text-[10px] font-bold">
                {getCartCount()}
              </p>
            )}
          </Link>

          {/* Mobile Menu */}
          <button
            className="p-1 rounded-full hover:bg-gray-100 transition-colors sm:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
          >
            <img src={assets.menu_icon} className="w-5" alt="Menu" />
          </button>
        </div>
      </nav>

      {/* Search Bar - Appears below navbar when toggled */}
      {showSearchBar && (
        <div className="bg-white py-3 px-4 md:px-8 border-b shadow-sm">
          <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto" ref={searchInputRef}>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <img src={assets.search_icon} alt="Search" className="w-5" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 bottom-0 bg-white z-50 transition-all duration-300 ease-in-out ${menuOpen ? "w-full" : "w-0 overflow-hidden"}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
            <img src={assets.dropdown_icon} alt="Close Menu" className="h-4 rotate-180" />
            <p className="text-lg">Close Menu</p>
          </div>

          <div className="px-5 py-3 border-b">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                ref={searchInputRef}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <img src={assets.search_icon} alt="Search" className="w-5" />
              </button>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto">
            {navItems.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-5 px-6 border-b hover:bg-gray-50 ${isActive ? "bg-gray-50 font-semibold" : ""}`
                }
              >
                <p className="text-lg">{label}</p>
              </NavLink>
            ))}
          </div>

          {token && (
            <div className="p-5 border-t">
              <button
                className="w-full py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;