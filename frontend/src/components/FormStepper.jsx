import { useNavigate } from "react-router-dom";

export default function FormStepper({
  currentStep,
  steps,
  title,
}) {
  const navigate = useNavigate();

  const clearDraft = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the saved draft?"
    );
    if (!confirmClear) return;
    localStorage.removeItem("jnfDraft");
    localStorage.removeItem("infDraft");
    window.location.reload();
  };

  return (
    <>
      <div className="mb-4">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors px-1"
        >
          &larr; Back to Home
        </button>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8 overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#7A0019]">
              {title}
            </h1>
          </div>
          <div className="mt-4 md:mt-0 flex items-center justify-end">
            <button
              type="button"
              onClick={clearDraft}
              className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
            >
              Clear Saved Draft
            </button>
          </div>
        </div>

      <div className="flex items-center justify-between min-w-[700px]">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={label} className="flex items-center relative flex-1 last:flex-none">
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-medium text-sm z-10 shrink-0 ${
                    isActive ? "bg-blue-600" : isCompleted ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  {isCompleted ? "✓" : stepNumber}
                </div>
                <span
                  className={`text-sm font-medium w-24 leading-tight ${
                    isActive ? "text-gray-900" : isCompleted ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>
              
              {}
              {index < steps.length - 1 && (
                <div className={`flex-1 h-[2px] mx-4 ${
                  stepNumber < currentStep ? "bg-green-500" : "bg-gray-200"
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}