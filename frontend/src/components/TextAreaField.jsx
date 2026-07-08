export default function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-gray-700">
        {label}
        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#7A0019] focus:border-transparent"
      />
    </div>
  );
}