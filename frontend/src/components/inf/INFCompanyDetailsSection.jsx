import SectionCard from "../SectionCard";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import RadioGroup from "../RadioGroup";
import CheckboxGroup from "../CheckboxGroup";

export default function INFCompanyDetailsSection({
  formData,
  handleChange,
  handleCategoryToggle,
}) {
  return (
    <SectionCard title="Company Details">
      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="Name of the Company"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <InputField
          label="Official Website"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <div className="mt-8">
        <CheckboxGroup
          label="Category/Sector"
          options={[
            "Software/IT",
            "Education/EdTech",
            "E-Commerce",
            "Consulting",
            "Core",
            "Banking & Finance",
            "Analytics",
            "Technology",
            "Media",
            "FMCG",
            "PSU",
            "Other",
          ]}
          selected={formData.category}
          onChange={handleCategoryToggle}
        />
      </div>

      {formData.category?.includes("Other") && (
        <div className="mt-5">
          <InputField
            label="Specify Category/Sector"
            name="categoryOther"
            value={formData.categoryOther}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="mt-8">
        <RadioGroup
          label="Hiring Type"
          name="hiringType"
          value={formData.hiringType}
          onChange={handleChange}
          options={[
            "2 month Internship",
            "Internship + FTE",
            "Internship + PPO",
          ]}
        />
      </div>

      <div className="mt-8">
        <TextAreaField
          label="Overview of the Company"
          name="companyOverview"
          value={formData.companyOverview}
          onChange={handleChange}
          rows={6}
        />
      </div>
    </SectionCard>
  );
}