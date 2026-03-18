import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ChevronLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[75vh] px-4 animate-in fade-in zoom-in duration-500">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Visual Element - Indigo Gradient 404 */}
        <div className="relative">
          <div className="text-[130px] font-black leading-none select-none bg-gradient-to-b from-indigo-100 to-transparent bg-clip-text text-transparent">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3 relative">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Oops! Page not found
          </h1>
          <p className="text-slate-500 text-base leading-relaxed max-w-[320px] mx-auto">
            The page you are looking for might have been moved, deleted, or
            doesn't exist.
          </p>
        </div>

        {/* Action Buttons - Matching Sidebar Style */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
          >
            <ChevronLeft size={18} />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-95"
          >
            <Home size={18} />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
