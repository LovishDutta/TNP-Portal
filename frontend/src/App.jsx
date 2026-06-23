import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JNFForm from "./pages/JNFForm";
import INFForm from "./pages/INFForm";
import SubmissionSuccess from "./pages/SubmissionSuccess";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSubmissionView from "./pages/admin/AdminSubmissionView";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jnf" element={<JNFForm />} />
      <Route path="/inf" element={<INFForm />} />
      <Route path="/success/:id" element={<SubmissionSuccess />} />
      
      {}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="submission/:id" element={<AdminSubmissionView />} />
      </Route>
    </Routes>
  );
}

export default App;