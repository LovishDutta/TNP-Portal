export default function RadioGroup({
  label,
  name,
  value,
  options,
  onChange,
}) {
  return (
    <div>

      <label className="block font-medium text-gray-700 mb-4">
        {label}
      </label>

      <div className="flex flex-wrap gap-3">

        {options.map((option) => (
          <label
            key={option}
            className={`cursor-pointer px-4 py-2 rounded-lg border transition
              ${
                value === option
                  ? "bg-[#7A0019] text-white border-[#7A0019]"
                  : "bg-white border-gray-300"
              }`}
          >
            <input
              type="radio"
              className="hidden"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
            />

            {option}
          </label>
        ))}

      </div>

    </div>
  );
}