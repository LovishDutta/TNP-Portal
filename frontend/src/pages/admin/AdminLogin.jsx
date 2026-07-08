import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, ArrowLeft } from "lucide-react";
import axios from "axios";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/login`, {
        username,
        password,
      });

      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up">
        <div className="flex justify-center">
          <img
            src="/nitkkr-logo.png"
            alt="NIT Kurukshetra"
            className="h-20 w-20 object-contain mb-2"
          />
        </div>
        <h2 className="mt-3 text-center text-2xl font-bold text-gray-900 tracking-tight">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Sign in to manage TNP submissions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="bg-white py-8 px-6 sm:rounded-2xl sm:px-10" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-100 p-3.5 rounded-xl">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7A0019]/20 focus:border-[#7A0019] transition-all duration-200"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7A0019]/20 focus:border-[#7A0019] transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-[#7A0019] hover:bg-[#5C0013] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7A0019] transition-all duration-200 ${
                  isLoading ? "opacity-60 cursor-not-allowed" : ""
                }`}
                style={{ boxShadow: '0 1px 3px rgba(122, 0, 25, 0.2)' }}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
