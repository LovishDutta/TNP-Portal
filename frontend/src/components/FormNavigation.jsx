export default function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex justify-between pt-6">

      <button
        type="button"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className={`px-6 py-3 rounded-xl font-medium
        ${
          currentStep === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 text-white hover:bg-gray-800"
        }`}
      >
        Previous
      </button>

      <button
        type="button"
        onClick={onNext}
        className="bg-[#7A0019] hover:bg-[#650015] text-white px-6 py-3 rounded-xl font-medium"
      >
        Next
      </button>

    </div>
  );
}