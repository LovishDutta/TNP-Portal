import React from "react";
import SectionCard from "./SectionCard";
import InputField from "./InputField";

function ImportantMentionsList() {
  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col h-[350px] mb-6"
      style={{
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center tracking-tight">
        Important Mentions
      </h3>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <ul className="space-y-4 text-gray-600 w-full">

          <li className="flex items-start">
            <span className="text-[#7A0019] mr-3 mt-1.5 flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><circle cx="4" cy="8" r="3" /></svg>
            </span>
            <span className="text-sm leading-relaxed">
              As per our latest curriculum, B.Tech students are available for internships with a minimum duration of 16 weeks.
            </span>
          </li>

          <li className="flex items-start">
            <span className="text-[#7A0019] mr-3 mt-1.5 flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><circle cx="4" cy="8" r="3" /></svg>
            </span>
            <span className="text-sm leading-relaxed">
              M.Tech students are available for 6/11-month internship.
            </span>
          </li>

          <li className="flex items-start">
            <span className="text-[#7A0019] mr-3 mt-1.5 flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><circle cx="4" cy="8" r="3" /></svg>
            </span>
            <span className="text-sm leading-relaxed">
              MCA students are available for 6-month internship (in their last semester).
            </span>
          </li>

          <li className="flex items-start">
            <span className="text-[#7A0019] mr-3 mt-1.5 flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><circle cx="4" cy="8" r="3" /></svg>
            </span>
            <span className="text-sm leading-relaxed">
              All information provided in the notification forms must be accurate and verifiable.
            </span>
          </li>

          <li className="flex items-start">
            <span className="text-[#7A0019] mr-3 mt-1.5 flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><circle cx="4" cy="8" r="3" /></svg>
            </span>
            <span className="text-sm leading-relaxed">
              Once submitted, forms cannot be modified without prior approval from the Training & Placement Cell.
            </span>
          </li>

          <li className="flex items-start">
            <span className="text-[#7A0019] mr-3 mt-1.5 flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><circle cx="4" cy="8" r="3" /></svg>
            </span>
            <span className="text-sm leading-relaxed">
              Companies are expected to adhere strictly to the agreed-upon compensation structure.
            </span>
          </li>

          <li className="flex items-start">
            <span className="text-[#7A0019] mr-3 mt-1.5 flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><circle cx="4" cy="8" r="3" /></svg>
            </span>
            <span className="text-sm leading-relaxed">
              Pre-Placement Offers (PPOs) must be routed exclusively through the Training & Placement Cell.
            </span>
          </li>

          <li className="flex items-start">
            <span className="text-[#7A0019] mr-3 mt-1.5 flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="4" cy="8" r="3" />
              </svg>
            </span>

            <div className="text-sm leading-relaxed">
              <strong>Second Offer Policy:</strong>

              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>
                  The new opportunity must offer a CTC of at least
                  <strong> 1.5× </strong>
                  the student's current offer.
                </li>

                <li>
                  The student's existing offer must have a
                  <strong> CTC of Rs.12 LPA or below.</strong>
                </li>

                <li>
                  At least
                  <strong> 50% of students </strong>
                  from the respective department must have already been placed
                  at the time of recruitment.
                </li>

                <li>
                  If
                  <strong> 80% or more students </strong>
                  of a department have already been placed, the remaining eligible
                  students of that department shall be permitted to participate in
                  <strong> all subsequent campus recruitment drives, including
                  PSU/Government Organization recruitment, irrespective of their
                  existing CTC.</strong>
                </li>
              </ul>
            </div>
          </li>

          <li className="flex items-start">
            <span className="text-[#7A0019] mr-3 mt-1.5 flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="4" cy="8" r="3" />
              </svg>
            </span>

            <div className="text-sm leading-relaxed">
              <strong>PSU Recruitment Policy:</strong>

              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>
                  Students who have already secured an on-campus offer shall remain
                  eligible to participate in recruitment drives conducted by
                  <strong> Public Sector Undertakings (PSUs)</strong> and
                  <strong> Government Organizations</strong>, subject to the
                  eligibility criteria prescribed by the recruiting organization.
                </li>

                <li>
                  Once a student receives an offer from a
                  <strong> PSU/Government Organization</strong>, the student shall
                  <strong> not be permitted to participate in the recruitment process of any other PSU/Government Organization.</strong>
                </li>
              </ul>
            </div>
          </li>

          <li className="flex items-start">
            <span className="text-[#7A0019] mr-3 mt-1.5 flex-shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="4" cy="8" r="3" />
              </svg>
            </span>

            <span className="text-sm leading-relaxed">
              <strong>Bonus Company Policy:</strong> Companies offering a
              <strong> CTC of ₹5 LPA or below</strong> shall be classified as
              <strong> Bonus Companies</strong>. Students selected by a Bonus
              Company shall remain eligible to participate in all subsequent campus
              recruitment drives offering a higher CTC without any restriction
              arising from their earlier selection.
            </span>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default function UndertakingSection({ formData, handleChange }) {
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
I hereby declare that the information provided in this form is true and correct to the best of my knowledge. I have read and understand all the provided important mentions from the TNP Recruitment Portal.            </label>
            {!formData.undertakingAccepted && (
              <p className="text-red-600 text-xs font-medium mt-1.5">
                Please read and submit.
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-2">
          <InputField
            label="Name of Form Filler"
            name="formFillerName"
            value={formData.formFillerName || ""}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <InputField
            label="Designation"
            name="formFillerDesignation"
            value={formData.formFillerDesignation || ""}
            onChange={handleChange}
            placeholder="Example: Talent Acquisition, HR, Hiring Manager etc."
            required
          />
        </div>
      </div>
    </SectionCard>
  );
}