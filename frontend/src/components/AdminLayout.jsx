import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, LogOut, Building2 } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/nitkkr-logo.png"
              alt="NIT Kurukshetra"
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="text-sm font-bold text-gray-900 leading-tight">TNP Cell</h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/admin/dashboard"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === "/admin/dashboard"
                ? "bg-[#7A0019]/10 text-[#7A0019]"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {}
      <div className="flex-1 flex flex-col overflow-hidden">
        {}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
          <h2 className="text-lg font-medium text-gray-900">
            {location.pathname === "/admin/dashboard" && "Dashboard Overview"}
            {location.pathname.includes("/admin/submission/") && "Submission Details"}
          </h2>
          <div className="flex items-center space-x-4">
             <div className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                Admin User
             </div>
          </div>
        </header>

        {}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
