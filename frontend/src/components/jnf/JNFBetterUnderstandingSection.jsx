import SectionCard from "../SectionCard";
import RadioGroup from "../RadioGroup";
import InputField from "../InputField";
import TextAreaField from "../TextAreaField";

export default function JNFBetterUnderstandingSection({
  formData,
  handleChange,
}) {
  return (
    <SectionCard title="Towards A Better Understanding">

      <div className="space-y-8">

        <RadioGroup
          label="Does your organization sponsor any kind of institutional events?"
          name="sponsorEvents"
          value={formData.sponsorEvents}
          onChange={handleChange}
          options={["Yes", "No"]}
        />

        <RadioGroup
          label="Is your organization interested in offering internships/training for pre-final year undergraduate/postgraduate students?"
          name="internshipsOffered"
          value={formData.internshipsOffered}
          onChange={handleChange}
          options={["Yes", "No"]}
        />

        <InputField
          label="If Yes, Please Mention the Streams"
          name="internshipStreams"
          value={formData.internshipStreams}
          onChange={handleChange}
        />

        <InputField
          label="If Offered, What Will Be the Duration of Internship?"
          name="internshipDuration"
          value={formData.internshipDuration}
          onChange={handleChange}
        />

        <RadioGroup
          label="Does your organization hold any events or contests in which our students can compete?"
          name="studentContests"
          value={formData.studentContests}
          onChange={handleChange}
          options={["Yes", "No"]}
        />

        <TextAreaField
          label="If Yes, Please Give Details"
          name="contestDetails"
          value={formData.contestDetails}
          onChange={handleChange}
          rows={5}
        />

      </div>

    </SectionCard>
  );
}