import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const pageTitle =
    location.pathname === "/admin/dashboard"
      ? "Dashboard Overview"
      : location.pathname.includes("/admin/submission/")
      ? "Submission Details"
      : "";

  return (
    <div className="flex flex-col h-screen bg-white">
      {}
      <header
        className="h-24 border-b-2 border-gray-200 flex items-center justify-between px-8 bg-white"
        style={{ boxShadow: "var(--shadow-sm)" }}
      >
        <Link
          to="/"
          className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg px-4 py-2.5 hover:border-gray-300 transition-all duration-200"
        >
          <img
            src="/nitkkr-logo.png"
            alt="NIT Kurukshetra"
            className="h-9 w-9 object-contain"
          />
          <h1 className="text-lg font-bold text-gray-900 tracking-tight whitespace-nowrap">
            TNP Cell <span className="font-semibold text-gray-500">— Admin Portal</span>
          </h1>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" strokeWidth={2.25} />
          <span className="text-sm">Logout</span>
        </button>
      </header>

      {}
      <main className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
        {pageTitle && (
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">{pageTitle}</h2>
        )}
        <Outlet />
      </main>
    </div>
  );
}