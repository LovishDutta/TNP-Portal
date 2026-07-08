import SectionCard from "../SectionCard";
import ContactCard from "../ContactCard";

export default function JNFCompanyOfficialsSection({
  formData,
  setFormData,
}) {
  return (
    <SectionCard title="Company Officials Details">

      <div className="space-y-6">

        <ContactCard
          title="Contact Person 1"
          contact={formData.contacts[0]}
          index={0}
          setFormData={setFormData}
        />

        <ContactCard
          title="Contact Person 2"
          contact={formData.contacts[1]}
          index={1}
          setFormData={setFormData}
        />

      </div>

    </SectionCard>
  );
}