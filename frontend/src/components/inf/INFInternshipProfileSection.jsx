import SectionCard from "../SectionCard";
import InputField from "../InputField";
import CourseProfileCard from "../CourseProfileCard";
import SelectField from "../SelectField";
import RadioGroup from "../RadioGroup";

import infCourses from "../../constants/infCourses";

export default function INFInternshipProfileSection({
  formData,
  setFormData,
  setValidationMessage,
}) {
  const handleProfileChange = (
    course,
    field,
    value
  ) => {
    setValidationMessage("");

    if (field === "gross" || field === "stipend" || field === "trainingPeriod") {
      if (value !== "" && !/^\d*\.?\d{0,2}$/.test(value)) {
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      internshipProfiles: {
        ...prev.internshipProfiles,
        [course]: {
          ...prev.internshipProfiles[course],
          [field]: value,
        },
      },
    }));
  };

  return (
    <SectionCard title="Internship Profile">
      <div className="space-y-6">
        <div>
          <RadioGroup
            label="Internship Type"
            name="internshipType"
            value={formData.internshipType || ""}
            onChange={(e) => {
              setValidationMessage("");
              setFormData((prev) => ({
                ...prev,
                internshipType: e.target.value,
              }));
            }}
            options={[
              "Internship Only",
              "Internship + FTE",
              "Internship with PPO Offers"
            ]}
            required
          />

          <p className="mt-2 text-xs text-black-1000 leading-relaxed">
            <strong>
            
            Note: A 6-month internship is permitted only when accompanied by an FTE (Full-Time Employment) offer.
              </strong>
          </p>
        </div>

        {infCourses.map((course) => (
          <CourseProfileCard
            key={course.key}
            title={course.title}
          >
            <InputField
              label="Designation"
              value={
                formData.internshipProfiles[
                  course.key
                ].designation
              }
              onChange={(e) =>
                handleProfileChange(
                  course.key,
                  "designation",
                  e.target.value
                )
              }
            />

            <InputField
              label="Gross Stipend"
              value={
                formData.internshipProfiles[
                  course.key
                ].gross
              }
              onChange={(e) =>
                handleProfileChange(
                  course.key,
                  "gross",
                  e.target.value
                )
              }
              placeholder="e.g. 50000"
              suffix="Per Month"
              error={formData.internshipProfiles[course.key].gross && !/^\d+(\.\d{1,2})?$/.test(formData.internshipProfiles[course.key].gross) ? "Invalid format" : ""}
            />

            <InputField
              label="In-Hand Stipend"
              value={
                formData.internshipProfiles[
                  course.key
                ].stipend
              }
              onChange={(e) =>
                handleProfileChange(
                  course.key,
                  "stipend",
                  e.target.value
                )
              }
              placeholder="e.g. 45000"
              suffix="Per Month"
              error={formData.internshipProfiles[course.key].stipend && !/^\d+(\.\d{1,2})?$/.test(formData.internshipProfiles[course.key].stipend) ? "Invalid format" : ""}
            />

            <InputField
              label="Perks"
              value={
                formData.internshipProfiles[
                  course.key
                ].perks
              }
              onChange={(e) =>
                handleProfileChange(
                  course.key,
                  "perks",
                  e.target.value
                )
              }
            />

            <InputField
              label="Training Period"
              value={
                formData.internshipProfiles[
                  course.key
                ].trainingPeriod
              }
              onChange={(e) =>
                handleProfileChange(
                  course.key,
                  "trainingPeriod",
                  e.target.value
                )
              }
              placeholder="e.g. 6"
              suffix="Months"
              error={formData.internshipProfiles[course.key].trainingPeriod && !/^\d+(\.\d{1,2})?$/.test(formData.internshipProfiles[course.key].trainingPeriod) ? "Invalid format" : ""}
            />

            <InputField
              label="Location"
              value={
                formData.internshipProfiles[
                  course.key
                ].location
              }
              onChange={(e) =>
                handleProfileChange(
                  course.key,
                  "location",
                  e.target.value
                )
              }
            />
          </CourseProfileCard>
        ))}

      </div>
    </SectionCard>
  );
}