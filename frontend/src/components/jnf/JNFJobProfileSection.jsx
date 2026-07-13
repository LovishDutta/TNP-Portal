import SectionCard from "../SectionCard";
import InputField from "../InputField";
import SelectField from "../SelectField";
import CourseProfileCard from "../CourseProfileCard";

import jnfCourses from "../../constants/jnfCourses";

export default function JNFJobProfileSection({
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
      jobProfiles: {
        ...prev.jobProfiles,
        [course]: {
          ...prev.jobProfiles[course],
          [field]: value,
        },
      },
    }));
  };

  return (
    <SectionCard title="Job Profile">
      <div className="space-y-6">
        {jnfCourses.map((course) => (
          <CourseProfileCard
            key={course.key}
            title={course.title}
          >
            <InputField
              label="Job Designation"
              value={
                formData.jobProfiles[course.key]
                  .designation
              }
              onChange={(e) =>
                handleProfileChange(
                  course.key,
                  "designation",
                  e.target.value
                )
              }
            />

            <div>
              <SelectField
                label="Job Description Available"
                value={
                  formData.jobProfiles[course.key]
                    .jobDescriptionAttached
                }
                onChange={(e) =>
                  handleProfileChange(
                    course.key,
                    "jobDescriptionAttached",
                    e.target.value
                  )
                }
                options={["Yes", "No"]}
              />

              <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                If you have a detailed Job Description
                (JD) document in PDF format, kindly
                share it by replying to the same email
                thread through which the Job
                Notification Form (JNF) was received.
              </p>
            </div>

            <InputField
              label="CTC"
              value={
                formData.jobProfiles[course.key]
                  .ctc
              }
              onChange={(e) =>
                handleProfileChange(
                  course.key,
                  "ctc",
                  e.target.value
                )
              }
            />

            <InputField
              label="Take Home Salary"
              value={
                formData.jobProfiles[course.key]
                  .takeHome
              }
              onChange={(e) =>
                handleProfileChange(
                  course.key,
                  "takeHome",
                  e.target.value
                )
              }
            />

            <InputField
              label="Perks"
              value={
                formData.jobProfiles[course.key]
                  .perks
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
                formData.jobProfiles[course.key]
                  .trainingPeriod
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
              label="Place of Posting"
              value={
                formData.jobProfiles[course.key]
                  .placeOfPosting
              }
              onChange={(e) =>
                handleProfileChange(
                  course.key,
                  "placeOfPosting",
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