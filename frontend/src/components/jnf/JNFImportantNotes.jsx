import SectionCard from "../SectionCard";

export default function JNFImportantNotes() {
  return (
    <SectionCard title="Important Mention">

      <ul className="list-disc pl-6 space-y-3 text-gray-700">

        <li>
          As per our latest curriculum, B.Tech students are available for internships with a minimum duration of 16 weeks.
        </li>

        <li>
          M.Tech students are available for
          6/11-month internship.
        </li>

        <li>
          MCA students are available for
          6-month internship
          (in their last semester).
        </li>

      </ul>

    </SectionCard>
  );
}