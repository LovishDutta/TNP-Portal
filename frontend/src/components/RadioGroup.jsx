export default function RadioGroup({
  label,
  name,
  value,
  options,
  onChange,
  required = false,
  error = "",
}) {
  return (
    <div>

      <label className="block font-medium text-gray-700 mb-4">
        {label}
        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <div className="flex flex-wrap gap-3">

        {options.map((option) => (
          <label
            key={option}
            className={`cursor-pointer px-4 py-2 rounded-lg border transition
              ${
                value === option
                  ? "bg-[#7A0019] text-white border-[#7A0019]"
                  : error ? "bg-white border-red-500" : "bg-white border-gray-300"
              }`}
          >
            <input
              type="radio"
              className="sr-only"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              required={required}
            />

            {option}
          </label>
        ))}

      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

    </div>
  );
}