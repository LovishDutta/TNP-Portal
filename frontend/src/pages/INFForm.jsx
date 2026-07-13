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
import UndertakingSection from "../components/UndertakingSection";
export default function INFForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const formTopRef = useRef(null);
  const [formData, setFormData] = useState(() => {
    const savedDraft =
      localStorage.getItem("infDraft");

    if (!savedDraft) return infInitialState;

    try {
      const parsed = JSON.parse(savedDraft);
      return { ...infInitialState, ...parsed };
    } catch {
      return infInitialState;
    }
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
      if (!formData.internshipType) {
        setValidationMessage("Please select the Internship Type before proceeding.");
        scrollToTop();
        return;
      }

      const hasInternshipProfile = Object.values(
        formData.internshipProfiles
      ).some((profile) => {
        return (
          profile.designation?.trim() &&
          profile.gross?.trim() &&
          profile.location?.trim()
        );
      });

      if (!hasInternshipProfile) {
        setValidationMessage(
          "Please complete the Internship Profile (Designation, Gross Stipend and Location) for at least one programme before proceeding."
        );
        scrollToTop();
        return;
      }
    }

    // STEP 3
    if (currentStep === 3) {
      const hasCourses =
        formData.ugBranches.length > 0 ||
        formData.dualDegreeBranches.length > 0 ||
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
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/inf`, trimmedData);
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

              <UndertakingSection
                formData={formData}
                handleChange={handleChange}
                academicNotes={[
                  "B.Tech students are available for 2-month summer internship (4th & 6th semester).",
                  "M.Tech students are available for 6/11-month internship.",
                  "MCA students are available for 2-month internship (4th semester).",
                  "MBA students are available for 2-month internship.",
                ]}
              />

              <INFSubmitSection
                onPrevious={previousStep}
                isSubmitting={isSubmitting}
                agreed={formData.undertakingAccepted}
              />
            </>
          )}
        </form>
      </div>
    </FormLayout>
  );
}