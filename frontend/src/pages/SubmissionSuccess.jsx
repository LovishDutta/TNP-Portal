import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Building2, CheckCircle } from "lucide-react";
import axios from "axios";

export default function SubmissionSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const formTypeLabel = (type) => (type === 'JNF' ? 'JINF' : type === 'INF' ? 'SINF' : type);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/public/submissions/${id}`);
        setSubmission(response.data);
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
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/public/submissions/pdf/${submission._id}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${formTypeLabel(submission.formType)}_${submission.companyName.replace(/\\s+/g, '_')}.pdf`); document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF.");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 min-h-screen bg-gray-50 flex items-center justify-center">Loading your submission...</div>;
  }

  if (!submission) {
    return (
      <div className="text-center p-8 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h3 className="text-lg font-medium text-gray-900">Submission not found</h3>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

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
    if (!formData) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Submitted Details</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          {Object.entries(formData).map(([key, value]) => {
            const isObject = typeof value === 'object' && value !== null;

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">

        { }
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center shadow-sm">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Form Submitted Successfully!</h2>
          <p className="text-gray-600 mt-2">Thank you for submitting the {formTypeLabel(submission.formType)} for {submission.companyName}.</p>          <p className="text-gray-500 text-sm mt-1">Our Training and Placement team will review it shortly.</p>
        </div>

        { }
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 bg-[#7A0019] text-white px-5 py-2.5 rounded-lg hover:bg-[#650015] transition-colors text-sm font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Receipt</span>
          </button>
        </div>

        { }
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

        { }
        <div className="space-y-6">
          {renderAllFields()}
        </div>
      </div>
    </div>
  );
}
