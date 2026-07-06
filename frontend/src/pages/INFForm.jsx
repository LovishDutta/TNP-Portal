import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormLayout from "../components/FormLayout";
import FormStepper from "../components/FormStepper";
import FormNavigation from "../components/FormNavigation";

import infInitialState from "../constants/infInitialState";

import INFCompanyDetailsSection from "../components/inf/INFCompanyDetailsSection";
import INFInternshipProfileSection from "../components/inf/INFInternshipProfileSection";
import INFCoursesSection from "../components/inf/INFCoursesSection";
import INFEligibilitySection from "../components/inf/INFEligibilitySection";
import INFSelectionProcessSection from "../components/inf/INFSelectionProcessSection";
import INFContactSection from "../components/inf/INFContactSection";
import INFBetterUnderstandingSection from "../components/inf/INFBetterUnderstandingSection";
import INFImportantNotes from "../components/inf/INFImportantNotes";
import INFSubmitSection from "../components/inf/INFSubmitSection";
import FormValidationMessage from "../components/FormValidationMessage";
export default function INFForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const formTopRef = useRef(null);
  const [formData, setFormData] = useState(() => {
    const savedDraft =
      localStorage.getItem("infDraft");

    return savedDraft
      ? JSON.parse(savedDraft)
      : infInitialState;
  });

  const [currentStep, setCurrentStep] =
    useState(1);
  const [validationMessage, setValidationMessage] =
  useState("");
  const totalSteps = 7;

  useEffect(() => {
    localStorage.setItem(
      "infDraft",
      JSON.stringify(formData)
    );
  }, [formData]);
  const scrollToTop = () => {
  formTopRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  };
  const handleChange = (e) => {
  const { name, value } = e.target;

  setValidationMessage("");

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
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
    const hasInternshipProfile = Object.values(
      formData.internshipProfiles
    ).some((profile) => {
      return (
        profile.designation?.trim() &&
        profile.jobDescriptionAttached?.trim() &&
        profile.gross?.trim() &&
        profile.location?.trim()
      );
    });

    if (!hasInternshipProfile) {
      setValidationMessage(
        "Please complete the Internship Profile (Designation, Job Description Available, Gross Stipend and Location) for at least one programme before proceeding."
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
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/inf`, formData);
      localStorage.removeItem("infDraft");
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
    "Internship Profile",
    "Courses Considered",
    "Eligibility Criteria",
    "Selection Process",
    "Contact Details"
  ];

  return (
    <FormLayout>
      <div ref={formTopRef}>
      <FormStepper
        title="Internship Notification Form"
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
            <INFCompanyDetailsSection
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
            <INFInternshipProfileSection
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
            <INFCoursesSection
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
            <INFEligibilitySection
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
            <INFSelectionProcessSection
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
            <INFContactSection
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
            <INFBetterUnderstandingSection
              formData={formData}
              handleChange={handleChange}
            />

            <INFImportantNotes />

            <INFSubmitSection
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