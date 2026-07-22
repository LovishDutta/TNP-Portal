import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Building2, Edit2, Save, X } from "lucide-react";
import axios from "axios";

export default function AdminSubmissionView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/submissions/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubmission(response.data);
        setEditableData(response.data.formData);
      } catch (error) {
        console.error("Error fetching submission details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmission();
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!submission) return;
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/submissions/pdf/${submission._id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${submission.formType}_${submission.companyName.replace(/\\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF.");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading details...</div>;
  }

  if (!submission) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium text-gray-900">Submission not found</h3>
        <Link to="/admin/dashboard" className="text-blue-600 hover:underline mt-4 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/submissions/${id}`, { formData: editableData }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmission(response.data);
      setIsEditing(false);
      alert("Submission updated successfully!");
    } catch (error) {
      console.error("Error saving submission:", error);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditableData(submission.formData);
    setIsEditing(false);
  };

  const updateField = (key, value, isJson = false) => {
    setEditableData(prev => {
      const newData = { ...prev };

      if (isJson) {
        try {
          newData[key] = JSON.parse(value);
        } catch (e) {
          newData[key] = value;
        }
      } else {
        newData[key] = value;
      }
      return newData;
    });
  };

  const { formData } = submission;

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      if (value.length === 0) return <span className="text-sm text-gray-400">N/A</span>;
      if (typeof value[0] !== 'object') {
        return (
          <div className="flex flex-wrap gap-2 mt-1">
            {value.map((item, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md border border-gray-200 shadow-sm">
                {String(item)}
              </span>
            ))}
          </div>
        );
      } else {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {value.map((obj, idx) => {
              const hasData = Object.values(obj).some(v => v);
              if (!hasData) return null;
              return (
                <div key={idx} className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm space-y-3">
                  <h5 className="font-bold text-[#7A0019] text-xs uppercase tracking-wider border-b border-gray-100 pb-2">Item {idx + 1}</h5>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(obj).map(([k, v]) => (
                      <div key={k} className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-sm text-gray-800 break-words">{v || 'N/A'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
    } else if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-4 mt-2">
          {Object.entries(value).map(([k, v]) => {
            if (typeof v === 'object' && v !== null) {
              const hasData = Object.values(v).some(innerVal => innerVal);
              if (!hasData) return null;
              return (
                <div key={k} className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
                  <h5 className="font-bold text-[#7A0019] mb-3 border-b border-gray-100 pb-2 uppercase text-xs tracking-wider">
                    {k.replace(/([A-Z])/g, ' $1').trim()}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(v).map(([subK, subV]) => (
                      <div key={subK} className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{subK.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-sm text-gray-800 break-words">{subV || 'N/A'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={k} className="flex flex-col mb-2">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-sm text-gray-800 break-words">{v || 'N/A'}</span>
                </div>
              );
            }
          })}
        </div>
      );
    }

    return <span className="text-sm font-medium text-gray-900 mt-1 break-words">{String(value) || 'N/A'}</span>;
  };

  const renderAllFields = () => {
    const data = isEditing ? editableData : formData;
    if (!data) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Form Details</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          {Object.entries(data).map(([key, value]) => {
            const isObject = typeof value === 'object' && value !== null;

            if (isEditing) {
              return (
                <div key={key} className={`flex flex-col ${isObject ? 'col-span-1 md:col-span-2' : ''}`}>
                  <label className="text-sm font-semibold text-gray-700 capitalize mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                  {isObject ? (
                    <textarea
                      rows={6}
                      className="w-full text-sm font-mono bg-white border border-gray-300 rounded p-3 shadow-sm focus:ring-[#7A0019] focus:border-[#7A0019]"
                      value={typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
                      onChange={(e) => updateField(key, e.target.value, true)}
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full text-sm bg-white border border-gray-300 rounded px-3 py-2 shadow-sm focus:ring-[#7A0019] focus:border-[#7A0019]"
                      value={value || ''}
                      onChange={(e) => updateField(key, e.target.value)}
                    />
                  )}
                </div>
              );
            }

            if (isObject) {
              return (
                <div key={key} className="col-span-1 md:col-span-2">
                  <h4 className="text-sm font-semibold text-gray-700 capitalize mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  {renderValue(value)}
                </div>
              )
            }
            return (
              <div key={key} className="flex flex-col bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                {renderValue(value)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/dashboard"
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="flex items-center space-x-3">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium shadow-sm"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center space-x-2 bg-[#7A0019] text-white px-4 py-2 rounded-lg hover:bg-[#650015] transition-colors text-sm font-medium shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium shadow-sm"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center space-x-2 bg-[#7A0019] text-white px-4 py-2 rounded-lg hover:bg-[#650015] transition-colors text-sm font-medium shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Changes"}</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#7A0019]/10 text-[#7A0019] rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{submission.companyName}</h2>
            <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${submission.formType === 'JNF' ? 'bg-[#7A0019]/10 text-[#7A0019]' : 'bg-green-100 text-green-800'
                }`}>
                {formTypeLabel(submission.formType)}
              </span>
              <span>•</span>
              <span>Submitted on {new Date(submission.submittedAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "medium",
                timeZone: "Asia/Kolkata",
              })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {renderAllFields()}
      </div>
    </div>
  );
}
