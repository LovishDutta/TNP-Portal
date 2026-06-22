export default function FormStepper({
  currentStep,
  totalSteps,
  title,
}) {
  const progress =
    ((currentStep - 1) /
      (totalSteps - 1)) *
    100;

  const clearDraft = () => {
    const confirmClear =
      window.confirm(
        "Are you sure you want to clear the saved draft?"
      );

    if (!confirmClear) return;

    localStorage.removeItem(
      "jnfDraft"
    );

    window.location.reload();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-[#7A0019]">
            {title}
          </h1>

          <p className="text-gray-600 mt-1">
            Step {currentStep} of{" "}
            {totalSteps}
          </p>
        </div>

        <div className="text-sm font-medium text-gray-700">
          {Math.round(progress)}%
          Complete
        </div>
      </div>

      <div className="mt-5 w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full bg-[#7A0019] transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={clearDraft}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Clear Saved Draft
        </button>
      </div>
    </div>
  );
}