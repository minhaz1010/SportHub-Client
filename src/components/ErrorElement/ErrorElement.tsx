import React from "react";
import { Link } from "react-router-dom";

const ErrorElement: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center h-full text-center p-4  text-red-800 rounded-lg space-y-5">
      <span className="text-4xl">⚠️</span>
      <h1 className="text-5xl font-semibold font-handjet mt-2">
        Oops! No Page Found
      </h1>

      <span className="mt-4 text-3xl">😕</span>

      <Link
        to="/"
        className="mt-6 px-6 py-2 font-handjet bg-blue-500 text-white text-3xl rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        🏠 Go to Home Page
      </Link>
    </div>
  );
};

export default ErrorElement;
