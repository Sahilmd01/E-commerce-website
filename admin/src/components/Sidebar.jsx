import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-white shadow-sm border-r border-gray-100">
      <div className="flex flex-col gap-2 pt-8 pl-6 pr-2">
        <NavLink
          to="/add"
          className={({ isActive }) => 
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200
            ${isActive 
              ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`
          }
        >
          <div className={`p-2 rounded-lg ${window.location.pathname === '/add' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
            <img src={assets.add_icon} className="w-5 h-5" alt="Add Items" />
          </div>
          <span className="hidden md:block font-medium">Add Items</span>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) => 
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200
            ${isActive 
              ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`
          }
        >
          <div className={`p-2 rounded-lg ${window.location.pathname === '/list' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
            <img src={assets.order_icon} className="w-5 h-5" alt="List Items" />
          </div>
          <span className="hidden md:block font-medium">List Items</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) => 
            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200
            ${isActive 
              ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`
          }
        >
          <div className={`p-2 rounded-lg ${window.location.pathname === '/orders' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
            <img src={assets.order_icon} className="w-5 h-5" alt="View Orders" />
          </div>
          <span className="hidden md:block font-medium">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;