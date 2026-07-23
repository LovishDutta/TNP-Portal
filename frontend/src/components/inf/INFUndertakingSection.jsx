import SectionCard from "../SectionCard";

function ImportantMentionsList() {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Important Mentions
      </h3>

      <ul className="list-disc pl-6 space-y-3 text-gray-700">
        <li>
          Dual Degree students are available for 6-8 week (2 month) internships, and are eligible to join full-time only after completing the remaining two years of their 5-year programme, i.e., in 2029.
        </li>
        <li>
          It is highly recommended that the PPO offers be made well in time, as students are eligible to apply to other companies till a PPO is confirmed.
        </li>
        <li>
          Job offers up to 5 LPA CTC will be considered as a Bonus offer.
        </li>
        <li>
          Students having first offer's CTC {"<"} 12 LPA, will be eligible for the second offer, provided 50% of their branch is placed and their second offer's CTC is 1.5 times the CTC of their first offer.
        </li>
        <li>
          For PSUs, the students are eligible irrespective of the previous offer or CTC. If the first offer is from PSU, then the student is not eligible for a second offer in any other PSU or private company.
        </li>
        <li>
          Students are eligible for the second offer, provided 80% of their branch is placed and their second offer's CTC is higher than their current CTC.
        </li>
        <li>
          Training & Placement Cell, NIT Kurukshetra encourages equal opportunity for all sections of the students with equal emphasis on Diversity, Equity, and Inclusivity (DEI). In addition to Gender Diversity consideration, Companies are strongly recommended to proactively support PwD/students with SLD, and other such applicants. If there are eligible PwD/SLD students, companies must take care of any of their special requirements.
        </li>
      </ul>
    </div>
  );
}

export default function INFUndertakingSection({ formData, handleChange }) {
  return (
    <SectionCard title="Undertaking">
      <div className="space-y-6">
        <ImportantMentionsList />

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="undertakingAccepted"
              name="undertakingAccepted"
              type="checkbox"
              required
              checked={formData.undertakingAccepted || false}
              onChange={(e) => {
                handleChange({
                  target: {
                    name: "undertakingAccepted",
                    value: e.target.checked
                  }
                });
              }}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#7A0019]"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="undertakingAccepted" className="font-medium text-gray-900">
              I hereby declare that all the information provided in this form is true, complete, and correct to the best of my knowledge. I have read and understood the information provided in this form by the T&P Cell, NIT Kurukshetra.
            </label>
            {!formData.undertakingAccepted && (
              <p className="text-red-600 text-xs font-medium mt-1.5">
                Please read and submit.
              </p>
            )}
          </div>
        </div>

        <hr className="border-gray-200" />

        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Facilities Available</h3>
          <div className="border border-[#7A0019]/30 rounded-xl p-5 bg-[#7A0019]/5">
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>250+ computers with webcam, microphone, and power backup for OAs/PIs.</li>
              <li>Institute Guest House on campus, without any charges.</li>
              <li>Pick & drop facility from Delhi NCR/Chandigarh.</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}