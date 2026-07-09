import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3">

        {/* Left Side */}
        <div className="flex items-center gap-3 flex-1 min-w-0">

          {!isHome && (
            <button
              onClick={() => navigate("/")}
              aria-label="Back to Home"
              className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <img
            src="/nitkkr-logo.png"
            alt="NIT Kurukshetra"
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain flex-shrink-0"
          />

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 leading-tight truncate">
              National Institute of Technology Kurukshetra
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-gray-500 truncate">
              Training & Placement Cell
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

          <Link
            to="/admin/login"
            className="text-xs sm:text-sm md:text-base font-medium text-[#7A0019] border border-[#7A0019]/20 hover:border-[#7A0019]/40 hover:bg-[#7A0019]/5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition whitespace-nowrap"
          >
            Admin
            <span className="hidden sm:inline"> Login</span>
          </Link>

        </div>

      </div>
    </nav>
  );
}