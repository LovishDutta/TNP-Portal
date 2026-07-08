import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
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

        <div>
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