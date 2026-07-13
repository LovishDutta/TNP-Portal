import InputField from "./InputField";

export default function ContactCard({
  title,
  contact,
  index,
  setFormData,
  required = false,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      if (value !== "" && !/^\d{0,10}$/.test(value)) {
        return;
      }
    }

    setFormData((prev) => {
      const updatedContacts = [...prev.contacts];

      updatedContacts[index] = {
        ...updatedContacts[index],
        [name]: value,
      };

      return {
        ...prev,
        contacts: updatedContacts,
      };
    });
  };

  return (
    <div className="border rounded-xl p-5">

      <h3 className="font-semibold mb-4">
        {title}
      </h3>

      <div className="grid md:grid-cols-2 gap-5">

        <InputField
          label="Contact Person"
          name="name"
          value={contact.name}
          onChange={handleChange}
          required={required}
        />

        <InputField
          label="Designation"
          name="designation"
          value={contact.designation}
          onChange={handleChange}
          required={required}
        />

        <InputField
          label="Mobile Number"
          name="mobile"
          value={contact.mobile}
          onChange={handleChange}
          required={required}
          error={contact.mobile && contact.mobile.length !== 10 ? "Must be exactly 10 digits" : ""}
        />

        <InputField
          label="Email Address"
          name="email"
          value={contact.email}
          onChange={handleChange}
          type="email"
          placeholder="e.g. john.doe@company.com"
          required={required}
          error={contact.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contact.email) ? "Invalid email address" : ""}
        />

      </div>

    </div>
  );
}
