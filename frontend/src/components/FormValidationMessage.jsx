export default function FormValidationMessage({
  message,
}) {
  if (!message) return null;

  return (
    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
      <p className="text-sm font-medium text-red-700">
        {message}
      </p>
    </div>
  );
}