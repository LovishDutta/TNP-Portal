import InputField from "./InputField";

export default function ContactCard({
  title,
  contact,
  index,
  setFormData,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

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
        />

        <InputField
          label="Designation"
          name="designation"
          value={contact.designation}
          onChange={handleChange}
        />

        <InputField
          label="Mobile Number"
          name="mobile"
          value={contact.mobile}
          onChange={handleChange}
        />

        <InputField
          label="Email Address"
          name="email"
          value={contact.email}
          onChange={handleChange}
          type="email"
        />

      </div>

    </div>
  );
}