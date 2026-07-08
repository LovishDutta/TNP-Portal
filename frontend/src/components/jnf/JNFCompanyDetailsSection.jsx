import SectionCard from "../SectionCard";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import RadioGroup from "../RadioGroup";

export default function JNFCompanyDetailsSection({
  formData,
  handleChange,
}) {
  return (
    <SectionCard title="Company Details">
      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <InputField
          label="Email Address"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
          type="email"
          required
        />

        <InputField
          label="Website"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <div className="mt-8">
        <RadioGroup
          label="Company Type"
          name="companyType"
          value={formData.companyType}
          onChange={handleChange}
          options={[
            "MNC",
            "Start-up",
            "PSU",
            "Private",
            "NGO",
            "Other",
          ]}
        />
      </div>

      {formData.companyType === "Other" && (
        <div className="mt-5">
          <InputField
            label="Specify Company Type"
            name="companyTypeOther"
            value={formData.companyTypeOther}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="mt-8">
        <RadioGroup
          label="Domain"
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          options={[
            "Analytics",
            "Consulting",
            "Core (Technical)",
            "Finance",
            "Management",
            "I.T.",
            "Other",
          ]}
        />
      </div>

      {formData.domain === "Other" && (
        <div className="mt-5">
          <InputField
            label="Specify Domain"
            name="domainOther"
            value={formData.domainOther}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="mt-8">
        <TextAreaField
          label="Brief About the Organisation"
          name="organisationDescription"
          value={formData.organisationDescription}
          onChange={handleChange}
          rows={6}
        />
      </div>
    </SectionCard>
  );
}