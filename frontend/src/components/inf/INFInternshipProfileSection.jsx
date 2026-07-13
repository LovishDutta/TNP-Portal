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
              label="Training Period (In Months)"
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