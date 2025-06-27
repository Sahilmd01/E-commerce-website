import { Link } from "react-router-dom";
import { FaTools } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-gray-900 text-white">
      <FaTools size={64} className="text-yellow-400 mb-4 animate-pulse" />
      <h1 className="text-5xl font-bold mb-3">404</h1>
      <p className="text-xl mb-4">This page is under construction 🛠️</p>
      <p className="text-gray-400 mb-6 max-w-md">
        We're working hard to get this page up and running. Please check back later or return to the homepage.
      </p>
      <Link
        to="/"
        className="bg-white text-black px-6 py-3 rounded font-medium hover:bg-gray-200 transition-colors duration-300"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
