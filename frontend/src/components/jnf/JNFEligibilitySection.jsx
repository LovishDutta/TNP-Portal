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

        <div className="mt-2 text-xs text-gray-500 leading-relaxed space-y-1">
          <p>• If your organisation has any stringent medical requirements (e.g. colour blindness), please mention them here.</p>
          <p>• We also encourage you to consider accommodations for PwD (Persons with Disabilities) and Students with Specific Learning Disabilities (SLD) — such as additional time, scribing, or larger fonts — as part of your Diversity, Equity, and Inclusivity (DEI) practices.</p>
        </div>

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