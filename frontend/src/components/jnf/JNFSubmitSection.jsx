export default function JNFSubmitSection({
  onPrevious,
  isSubmitting,
  agreed,
}) {
  const isDisabled = isSubmitting || !agreed;

  return (
    <div className="pt-6">
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isSubmitting}
          className={`bg-gray-700 text-white px-6 py-3 rounded-xl ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
        >
          Previous
        </button>

        <button
          type="submit"
          disabled={isDisabled}
          className={`bg-[#7A0019] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
            isDisabled
              ? "opacity-40 cursor-not-allowed grayscale"
              : "hover:bg-[#650015]"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Form"}
        </button>
      </div>

      {!agreed && !isSubmitting && (
        <p className="text-red-600 text-sm font-medium text-right mt-2">
          Please read and submit.
        </p>
      )}
    </div>
  );
}