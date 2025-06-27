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
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSearchBar(false);
      }
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
      {/* Navbar */}
      <nav className="flex items-center justify-between py-4 px-4 md:px-8 bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={assets.logo} alt="Logo" className="w-36 hover:opacity-90 transition-opacity" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-8 text-gray-700 text-[15px]">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `transition-colors py-2 px-1 hover:text-indigo-600 ${
                  isActive ? "text-indigo-600 font-semibold" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </ul>

        {/* Actions: Search, Profile, Cart, Menu */}
        <div className="flex items-center gap-5">
          {/* Search Toggle */}
          <button
            onClick={() => setShowSearchBar(!showSearchBar)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <img src={assets.search_icon} alt="Search" className="w-5 opacity-80 hover:opacity-100" />
          </button>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                if (token) setProfileOpen(!profileOpen);
                else navigate("/login");
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <img src={assets.profile_icon} alt="Profile" className="w-5 opacity-80 hover:opacity-100" />
            </button>

            {token && profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg py-2 border border-gray-100">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setProfileOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    navigate("/orders");
                    setProfileOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                >
                  Orders
                </button>
                <button
                  onClick={logout}
                  className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <img src={assets.cart_icon} alt="Cart" className="w-5 opacity-80 hover:opacity-100" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1.5 -right-1.5 text-[10px] font-semibold bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition"
          >
            <img src={assets.menu_icon} alt="Menu" className="w-5 opacity-80 hover:opacity-100" />
          </button>
        </div>
      </nav>

      {/* Search Bar */}
      {showSearchBar && (
        <div className="bg-white px-4 md:px-8 py-3 border-b border-gray-100 shadow-sm">
          <form onSubmit={handleSearch} ref={searchInputRef} className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="submit" className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <img src={assets.search_icon} alt="Search" className="w-5 opacity-70" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-30 transition-opacity ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 bg-white w-80 max-w-full shadow-xl transition-transform transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <img src={assets.logo} alt="Logo" className="w-32" />
            <button onClick={() => setMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <img src={assets.dropdown_icon} className="w-4 rotate-180" alt="Close" />
            </button>
          </div>

          {/* Search */}
          <div className="px-5 py-3 border-b">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute top-1/2 right-3 transform -translate-y-1/2">
                <img src={assets.search_icon} alt="Search" className="w-5" />
              </button>
            </form>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            {navItems.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-4 px-6 text-lg border-b hover:bg-indigo-50 ${
                    isActive ? "bg-indigo-50 font-medium text-indigo-700" : "text-gray-800"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Logout (if logged in) */}
          {token && (
            <div className="p-5 border-t">
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full py-3 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100"
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
