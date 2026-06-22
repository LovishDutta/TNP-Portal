import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/nitkkr-logo.png"
            alt="NIT Kurukshetra"
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
          />

          <div>
            <h1 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 leading-tight">
              National Institute of Technology Kurukshetra
            </h1>

            <p className="text-xs sm:text-sm text-gray-600">
              Training & Placement Cell
            </p>
          </div>
        </div>

        <div>
          <Link
            to="/admin/login"
            className="hidden sm:inline-block text-sm font-medium text-[#7A0019] hover:text-[#650015] border border-[#7A0019] px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </nav>
  );
}