import SectionCard from "../SectionCard";
import RadioGroup from "../RadioGroup";
import InputField from "../InputField";

export default function INFSelectionProcessSection({
  formData,
  handleChange,
}) {
  return (
    <SectionCard title="Selection Process">
      <div className="space-y-8">

        <InputField
          label="Preferred Date of Visit"
          type="date"
          name="preferredVisitDate"
          value={
            formData.preferredVisitDate
          }
          onChange={handleChange}
        />

        <RadioGroup
          label="Resume Shortlisting"
          name="resumeShortlisting"
          value={
            formData.resumeShortlisting
          }
          onChange={handleChange}
          options={["Yes", "No"]}
        />

        <RadioGroup
          label="Pre Placement Talk"
          name="prePlacementTalk"
          value={
            formData.prePlacementTalk
          }
          onChange={handleChange}
          options={["Yes", "No"]}
        />

        <RadioGroup
          label="Written Test"
          name="writtenTest"
          value={formData.writtenTest}
          onChange={handleChange}
          options={["Yes", "No"]}
        />

        <RadioGroup
          label="Aptitude Test"
          name="aptitudeTest"
          value={formData.aptitudeTest}
          onChange={handleChange}
          options={["Yes", "No"]}
        />

        <RadioGroup
          label="Technical Test"
          name="technicalTest"
          value={
            formData.technicalTest
          }
          onChange={handleChange}
          options={["Yes", "No"]}
        />

        <RadioGroup
  label="Mode of Test"
  name="testMode"
  value={formData.testMode}
  onChange={handleChange}
  options={[
    "Written (Pen & Paper)",
    "Online",
    "Both",
    "Not Applicable",
  ]}
/>

        <RadioGroup
          label="Group Discussion"
          name="groupDiscussion"
          value={
            formData.groupDiscussion
          }
          onChange={handleChange}
          options={["Yes", "No"]}
        />

        <RadioGroup
          label="Technical Interview"
          name="technicalInterview"
          value={
            formData.technicalInterview
          }
          onChange={handleChange}
          options={["Yes", "No"]}
        />

        <RadioGroup
          label="HR Interview"
          name="hrInterview"
          value={formData.hrInterview}
          onChange={handleChange}
          options={["Yes", "No"]}
        />

      </div>
    </SectionCard>
  );
}