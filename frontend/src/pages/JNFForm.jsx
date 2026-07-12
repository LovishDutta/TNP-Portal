import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormLayout from "../components/FormLayout";
import FormStepper from "../components/FormStepper";
import FormNavigation from "../components/FormNavigation";

import jnfInitialState from "../constants/jnfInitialState";

import JNFCompanyDetailsSection from "../components/jnf/JNFCompanyDetailsSection";
import JNFJobProfileSection from "../components/jnf/JNFJobProfileSection";
import JNFCoursesSection from "../components/jnf/JNFCoursesSection";
import JNFEligibilitySection from "../components/jnf/JNFEligibilitySection";
import JNFSelectionProcessSection from "../components/jnf/JNFSelectionProcessSection";
import JNFCompanyOfficialsSection from "../components/jnf/JNFCompanyOfficialsSection";
import JNFBetterUnderstandingSection from "../components/jnf/JNFBetterUnderstandingSection";
import JNFImportantNotes from "../components/jnf/JNFImportantNotes";
import JNFSubmitSection from "../components/jnf/JNFSubmitSection";
import FormValidationMessage from "../components/FormValidationMessage";
import UndertakingSection from "../components/UndertakingSection";

// Same "Important Mentions" scroll box used on the Home page,
// shown here before the JNF form so recruiters see the policies first.
function JNFPoliciesBox() {
  return (
    <div
      className="bg-white rounded-2xl p-8 flex flex-col h-[400px] mb-8"
      style={{
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6 text-center tracking-tight">
        Important Mentions
      </h2>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <ul className="space-y-4 text-gray-600 w-full">

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
        <strong> CTC of ₹12 LPA or below.</strong>
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

export default function JNFForm() {
  const navigate = useNavigate();
  const formTopRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(() => {
    const savedDraft =
      localStorage.getItem("jnfDraft");

    return savedDraft
      ? JSON.parse(savedDraft)
      : jnfInitialState;
  });

  const [currentStep, setCurrentStep] =
    useState(1);
  const [validationMessage, setValidationMessage] =
  useState("");
  const totalSteps = 7;

  useEffect(() => {
    localStorage.setItem(
      "jnfDraft",
      JSON.stringify(formData)
    );
  }, [formData]);

  useEffect(() => {
  setValidationMessage("");
  }, [currentStep]);

  // Page ko top se open karo — mount hote hi scroll ko top pe le aao
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleChange = (e) => {
  const { name, value } = e.target;

  setValidationMessage("");

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  const scrollToTop = () => {
  formTopRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
  const nextStep = () => {
  setValidationMessage("");

  // STEP 1
  if (currentStep === 1) {
    if (
      !formData.companyName.trim() ||
      !formData.emailAddress.trim()
    ) {
      setValidationMessage(
        "Company Name and Email Address are required to continue."
      );
      scrollToTop();
      return;
    }
  }

  // STEP 2
  if (currentStep === 2) {
    const hasJobProfile = Object.values(
  formData.jobProfiles
).some((profile) => {
  return (
    profile.designation.trim() !== "" &&
    profile.jobDescriptionAttached.trim() !== "" &&
    profile.ctc.trim() !== "" &&
    profile.placeOfPosting.trim() !== ""
  );
});

    if (!hasJobProfile) {
      setValidationMessage(
  "Please complete the Job Profile (Job Designation, Job Description Available, CTC and Place of Posting) for at least one programme before proceeding."
);
      scrollToTop();
      return;
    }
  }

  // STEP 3
  if (currentStep === 3) {
    const hasCourses =
      formData.ugBranches.length > 0 ||
      formData.pgSpecializations.length > 0;

    if (!hasCourses) {
      setValidationMessage(
        "Please select at least one course/programme before proceeding."
      );
      scrollToTop();
      return;
    }
  }

  if (currentStep < totalSteps) {
    setCurrentStep((prev) => prev + 1);
  }
};

  const previousStep = () => {
  setValidationMessage("");

  if (currentStep > 1) {
    setCurrentStep((prev) => prev - 1);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.undertakingAccepted) {
      setValidationMessage("Please accept the undertaking.");
      scrollToTop();
      return;
    }
    
    if (!formData.formFillerName || formData.formFillerName.trim() === "") {
      setValidationMessage("Please enter the name of the form filler.");
      scrollToTop();
      return;
    }
    
    if (!formData.formFillerDesignation || formData.formFillerDesignation.trim() === "") {
      setValidationMessage("Please enter the designation.");
      scrollToTop();
      return;
    }

    const trimmedData = {
      ...formData,
      formFillerName: formData.formFillerName.trim(),
      formFillerDesignation: formData.formFillerDesignation.trim()
    };

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/jnf`, trimmedData);
      localStorage.removeItem("jnfDraft");
      navigate(`/success/${response.data.id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepperLabels = [
    "Company Details",
    "Job Profile",
    "Courses Considered",
    "Eligibility Criteria",
    "Selection Process",
    "Contact Details"
  ];

  return (
    <FormLayout>
       <div ref={formTopRef}>
      {/* Policies box — shown first, before the stepper and the form */}
      <JNFPoliciesBox />

      <FormStepper
        title="Job Notification Form"
        currentStep={currentStep}
        steps={stepperLabels}
      />
      <FormValidationMessage
      message={validationMessage}
      />
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {currentStep === 1 && (
          <>
            <JNFCompanyDetailsSection
              formData={formData}
              handleChange={handleChange}
            />

            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrevious={previousStep}
              onNext={nextStep}
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <JNFJobProfileSection
              formData={formData}
              setFormData={setFormData}
              setValidationMessage={setValidationMessage}
            />

            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrevious={previousStep}
              onNext={nextStep}
            />
          </>
        )}

        {currentStep === 3 && (
          <>
            <JNFCoursesSection
              formData={formData}
              setFormData={setFormData}
              setValidationMessage={setValidationMessage}
            />

            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrevious={previousStep}
              onNext={nextStep}
            />
          </>
        )}

        {currentStep === 4 && (
          <>
            <JNFEligibilitySection
              formData={formData}
              handleChange={handleChange}
            />

            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrevious={previousStep}
              onNext={nextStep}
            />
          </>
        )}

        {currentStep === 5 && (
          <>
            <JNFSelectionProcessSection
              formData={formData}
              handleChange={handleChange}
            />

            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrevious={previousStep}
              onNext={nextStep}
            />
          </>
        )}

        {currentStep === 6 && (
          <>
            <JNFCompanyOfficialsSection
              formData={formData}
              setFormData={setFormData}
            />

            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrevious={previousStep}
              onNext={nextStep}
            />
          </>
        )}

        {currentStep === 7 && (
          <>
            <JNFBetterUnderstandingSection
              formData={formData}
              handleChange={handleChange}
            />

            <JNFImportantNotes />

            <UndertakingSection 
              formData={formData}
              handleChange={handleChange}
            />

            <JNFSubmitSection
              onPrevious={previousStep}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </form>
      </div>
    </FormLayout>
  );
}