export default function INFSubmitSection({
  onPrevious,
  isSubmitting,
}) {
  return (
    <div className="flex justify-between pt-6">
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
        disabled={isSubmitting}
        className={`bg-[#7A0019] text-white px-8 py-3 rounded-xl font-semibold ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#650015]"}`}
      >
        {isSubmitting ? "Submitting..." : "Submit Internship Form"}
      </button>
    </div>
  );
}