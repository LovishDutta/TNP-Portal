export const handleInputChange = (
  e,
  setFormData
) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

export const handleCheckboxChange = (
  option,
  field,
  setFormData
) => {
  setFormData((prev) => {
    const exists = prev[field].includes(option);

    return {
      ...prev,
      [field]: exists
        ? prev[field].filter(
            (item) => item !== option
          )
        : [...prev[field], option],
    };
  });
};