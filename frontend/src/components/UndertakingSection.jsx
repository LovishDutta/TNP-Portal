import React from "react";
import SectionCard from "./SectionCard";
import InputField from "./InputField";

export default function UndertakingSection({ formData, handleChange }) {
  return (
    <SectionCard title="Undertaking">
      <div className="space-y-6">
        <p className="text-gray-700 text-sm leading-relaxed">
          I hereby declare that all the information provided in this form is true, complete, and correct to the best of my knowledge. I have read, understood, and agree to abide by all the Training & Placement Cell policies and guidelines.
        </p>
        
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
              I have read the above undertaking and agree to all the Training & Placement Cell policies.
            </label>
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
