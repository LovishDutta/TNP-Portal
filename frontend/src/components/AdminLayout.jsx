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
    <div className="flex h-screen bg-white">
      {}
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/nitkkr-logo.png"
              alt="NIT Kurukshetra"
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="text-sm font-bold text-gray-900 leading-tight tracking-tight">TNP Cell</h1>
              <p className="text-xs text-gray-400 font-medium">Admin Portal</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <Link
            to="/admin/dashboard"
            className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
              location.pathname === "/admin/dashboard"
                ? "bg-[#7A0019]/8 text-[#7A0019] font-semibold"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <LayoutDashboard className="w-[18px] h-[18px]" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-2.5 w-full rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {}
      <div className="flex-1 flex flex-col overflow-hidden">
        {}
        <header className="bg-white border-b border-gray-100 h-14 flex items-center justify-between px-8" style={{ boxShadow: 'var(--shadow-xs)' }}>
          <h2 className="text-sm font-semibold text-gray-900 tracking-tight">
            {location.pathname === "/admin/dashboard" && "Dashboard Overview"}
            {location.pathname.includes("/admin/submission/") && "Submission Details"}
          </h2>
          <div className="flex items-center space-x-4">
             <div className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                Admin User
             </div>
          </div>
        </header>

        {}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 
