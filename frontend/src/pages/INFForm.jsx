import { useEffect, useState } from "react";
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
import INFFacilities from "../components/inf/INFFacilities";
import INFSubmitSection from "../components/inf/INFSubmitSection";

export default function INFForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(() => {
    const savedDraft =
      localStorage.getItem("infDraft");

    return savedDraft
      ? JSON.parse(savedDraft)
      : infInitialState;
  });

  const [currentStep, setCurrentStep] =
    useState(1);

  const totalSteps = 7;

  useEffect(() => {
    localStorage.setItem(
      "infDraft",
      JSON.stringify(formData)
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const navigate = useNavigate();

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

  return (
    <FormLayout>
      <FormStepper
        title="Internship Notification Form"
        currentStep={currentStep}
        totalSteps={totalSteps}
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

            <INFFacilities />

            <INFSubmitSection
              onPrevious={previousStep}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </form>
    </FormLayout>
  );
}