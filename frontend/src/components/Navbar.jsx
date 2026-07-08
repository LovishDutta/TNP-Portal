import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Back button — only shown when not on the Home page */}
          {!isHome && (
            <button
              onClick={() => navigate("/")}
              aria-label="Back to home"
              className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 mr-1 flex-shrink-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <img
            src="/nitkkr-logo.png"
            alt="NIT Kurukshetra"
            className="h-11 w-11 sm:h-12 sm:w-12 object-contain"
          />

          <div>
            <h1 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 leading-tight tracking-tight">
              National Institute of Technology Kurukshetra
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Training & Placement Cell
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/demographics"
            className="hidden sm:inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Demographics
          </Link>
          <Link
            to="/admin/login"
            className="hidden sm:inline-flex items-center text-sm font-medium text-[#7A0019] hover:text-[#5C0013] border border-[#7A0019]/20 hover:border-[#7A0019]/40 px-4 py-2 rounded-lg hover:bg-[#7A0019]/5 transition-all duration-200"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </nav>
  );
}