import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <Link 
        to="/" 
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;