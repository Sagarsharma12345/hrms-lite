import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ChevronLeft, Search } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Visual Element */}
        <div className="relative">
          <div className="text-[120px] font-black text-gray-100 leading-none select-none">
            404
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Page not found
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            <ChevronLeft size={18} />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
          >
            <Home size={18} />
            Take me Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
