export default function InputField({
  label,
  name,
  value,
  onChange,
  onKeyDown,
  placeholder = "",
  type = "text",
  required = false,
  error = "",
  suffix = "",
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-gray-700">
        {label}
        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#7A0019]"} px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent ${suffix ? "pr-16" : ""}`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}