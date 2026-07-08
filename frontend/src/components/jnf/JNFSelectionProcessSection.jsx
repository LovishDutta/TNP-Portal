import SectionCard from "../SectionCard";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";
import RadioGroup from "../RadioGroup";

export default function JNFSelectionProcessSection({
  formData,
  handleChange,
}) {
  return (
    <SectionCard title="Selection Process">
      <div className="space-y-8">

        <RadioGroup
          label="Resume Based Shortlisting"
          name="resumeShortlisting"
          value={formData.resumeShortlisting}
          onChange={handleChange}
          options={["Yes", "No"]}
        />

        <RadioGroup
          label="Pre Placement Talk"
          name="prePlacementTalk"
          value={formData.prePlacementTalk}
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
          value={formData.groupDiscussion}
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
          value={formData.technicalTest}
          onChange={handleChange}
          options={["Yes", "No"]}
        />

        <RadioGroup
          label="Technical Interview"
          name="technicalInterview"
          value={formData.technicalInterview}
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

        <TextAreaField
          label="Details of Other Rounds (if any)"
          name="otherRounds"
          value={formData.otherRounds}
          onChange={handleChange}
        />

        <div className="grid md:grid-cols-2 gap-6">

          <InputField
            label="Expected Number of Recruits"
            name="expectedRecruits"
            value={formData.expectedRecruits}
            onChange={handleChange}
          />

          <InputField
            label="Tentative Date of Visit"
            type="date"
            name="tentativeVisitDate"
            value={formData.tentativeVisitDate}
            onChange={handleChange}
          />

        </div>

        <RadioGroup
          label="Accommodation Required"
          name="accommodationRequired"
          value={formData.accommodationRequired}
          onChange={handleChange}
          options={["Yes", "No"]}
        />

        <TextAreaField
          label="Service Agreement / Bond Details"
          name="bondDetails"
          value={formData.bondDetails}
          onChange={handleChange}
        />

      </div>
    </SectionCard>
  );
}