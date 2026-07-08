import SectionCard from "../SectionCard";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";

export default function JNFEligibilitySection({
  formData,
  handleChange,
}) {
  return (
    <SectionCard title="Eligibility Criteria">

      <div className="grid md:grid-cols-2 gap-6">

        <InputField
          label="Minimum CGPA (1-10)"
          name="minimumCGPA"
          value={formData.minimumCGPA}
          onChange={handleChange}
        />

      </div>

      <div className="mt-6">

        <TextAreaField
          label="Any Stringent Medical Condition"
          name="medicalCondition"
          value={formData.medicalCondition}
          onChange={handleChange}
          rows={4}
        />

      </div>

      <div className="mt-6">

        <TextAreaField
          label="Any Other Criteria"
          name="otherCriteria"
          value={formData.otherCriteria}
          onChange={handleChange}
          rows={4}
        />

      </div>

    </SectionCard>
  );
}