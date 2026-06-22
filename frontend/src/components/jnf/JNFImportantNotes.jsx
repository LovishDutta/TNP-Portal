import SectionCard from "../SectionCard";

export default function JNFImportantNotes() {
  return (
    <SectionCard title="Important Mention">

      <ul className="list-disc pl-6 space-y-3 text-gray-700">

        <li>
          As per our latest upgraded curriculum,
          B.Tech students are available for a
          six-month internship, but with FTE only.
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