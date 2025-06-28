import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backEndURL = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />

          <div className="flex w-full">
            {/* Sidebar only visible on medium screens and up */}
            <div className="hidden md:block">
              <Sidebar />
            </div>

            {/* Content area full width on mobile, with left margin on desktop */}
            <div className="w-full md:w-[82%] mx-auto my-8 text-gray-600 text-base px-4 sm:px-6 md:ml-[max(5vw,25px)]">
              <Routes>
                <Route path="*" element={<Navigate to="/add" />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
              <Footer />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
