import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Download, Trash2, Search, FileText } from "lucide-react";
import axios from "axios";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmissions(response.data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/submissions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmissions(submissions.filter(sub => sub._id !== id));
    } catch (error) {
      console.error("Error deleting submission:", error);
      alert("Failed to delete submission.");
    }
  };

  const handleDownloadPDF = async (id, companyName, formType) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/submissions/pdf/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${formType}_${companyName.replace(/\\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF.");
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.formType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "ALL" || sub.formType === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="grid grid-cols-2 gap-4 stagger-children">
          <div className="bg-white p-5 rounded-xl min-w-[150px] border-2 border-gray-300 transition-all duration-300 hover:shadow-md hover:border-gray-400" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total JNF</p>
            <p className="text-2xl font-bold text-gray-900 mt-1.5 tracking-tight">
              {submissions.filter(s => s.formType === 'JNF').length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl min-w-[150px] border-2 border-gray-300 transition-all duration-300 hover:shadow-md hover:border-gray-400" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total INF</p>
            <p className="text-2xl font-bold text-gray-900 mt-1.5 tracking-tight">
              {submissions.filter(s => s.formType === 'INF').length}
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-600" strokeWidth={2.25} />
          </div>
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border-2 border-gray-300 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7A0019]/20 focus:border-[#7A0019] text-sm font-medium transition-all duration-200"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden border-2 border-gray-300" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <nav className="flex space-x-6 px-6 border-b-2 border-gray-300" aria-label="Tabs">
          {["ALL", "JNF", "INF"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-3.5 px-1 border-b-2 font-semibold text-xs uppercase tracking-wider transition-all duration-200 -mb-0.5
                ${activeTab === tab
                  ? "border-[#7A0019] text-[#7A0019]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
              `}
            >
              {tab === "ALL" ? "All Forms" : `${tab} Forms`}
            </button>
          ))}
        </nav>

        {isLoading ? (
          <div className="p-12 text-center text-gray-500 text-sm">Loading submissions...</div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-gray-50 rounded-xl border-2 border-gray-300 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">No submissions found</h3>
            <p className="mt-1.5 text-gray-500 text-sm">Wait for recruiters to submit JNF/INF forms.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Form Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Submitted Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-gray-50/60 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{submission.companyName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${submission.formType === 'JNF' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                        {submission.formType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {new Date(submission.submittedAt).toLocaleDateString("en-IN", {
                        dateStyle: "medium",
                        timeZone: "Asia/Kolkata",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/admin/submission/${submission._id}`}
                          className="text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 transition-colors duration-200 p-2.5 rounded-lg border border-gray-200 hover:border-blue-200"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" strokeWidth={2.25} />
                        </Link>
                        <button
                          onClick={() => handleDownloadPDF(submission._id, submission.companyName, submission.formType)}
                          className="text-gray-500 hover:text-emerald-600 bg-gray-50 hover:bg-emerald-50 transition-colors duration-200 p-2.5 rounded-lg border border-gray-200 hover:border-emerald-200"
                          title="Download PDF"
                        >
                          <Download className="w-5 h-5" strokeWidth={2.25} />
                        </button>
                        <button
                          onClick={() => handleDelete(submission._id)}
                          className="text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 transition-colors duration-200 p-2.5 rounded-lg border border-gray-200 hover:border-red-200"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" strokeWidth={2.25} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}