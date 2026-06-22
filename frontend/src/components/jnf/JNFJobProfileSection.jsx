import SectionCard from "../SectionCard";
import InputField from "../InputField";
import SelectField from "../SelectField";
import CourseProfileCard from "../CourseProfileCard";

const courses = [
  { key: "btech", title: "B.Tech" },
  { key: "minor", title: "Minor Degree (UG)" },
  { key: "mca", title: "MCA" },
  { key: "mtech", title: "M.Tech" },
  { key: "mba", title: "MBA" },
  { key: "msc", title: "M.Sc." },
  { key: "phd", title: "Ph.D" },
];

export default function JNFJobProfileSection({
  formData,
  setFormData,
}) {
  const handleProfileChange = (
    course,
    field,
    value
  ) => {
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
        {courses.map((course) => (
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

            <SelectField
              label="Job Description Attached"
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
              label="Training Period"
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