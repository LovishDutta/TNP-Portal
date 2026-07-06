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
      formData.minorDegrees.length > 0 ||
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
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/jnf`, formData);
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