export default function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
}) {
  return (
    <div>
      <label className="block font-medium text-gray-700 mb-3">
        {label}
      </label>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onChange(option)}
            />

            {option}
          </label>
        ))}
      </div>
    </div>
  );
}