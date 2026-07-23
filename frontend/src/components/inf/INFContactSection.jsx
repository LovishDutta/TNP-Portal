import SectionCard from "../SectionCard";
import ContactCard from "../ContactCard";

export default function INFContactSection({
  formData,
  setFormData,
}) {
  return (
    <SectionCard title="Contact Information">

      <div className="space-y-6">

        <ContactCard
          title="Contact Person 1"
          contact={formData.contacts[0]}
          index={0}
          setFormData={setFormData}
          required={true}
        />

        <ContactCard
          title="Contact Person 2"
          contact={formData.contacts[1]}
          index={1}
          setFormData={setFormData}
          required={false}
        />

      </div>

      <p className="mt-6 text-gray-700 text-sm">
        The completed form is to be mailed to:{" "}
        <a href="mailto:tnpoffice@nitkkr.ac.in" className="text-blue-600 underline">tnpoffice@nitkkr.ac.in</a>{" "}
        and{" "}
        <a href="mailto:tpo@nitkkr.ac.in" className="text-blue-600 underline">tpo@nitkkr.ac.in</a>{" "}
        at the earliest.
      </p>

    </SectionCard>
  );
}