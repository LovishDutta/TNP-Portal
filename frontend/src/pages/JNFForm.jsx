import { useEffect, useState } from "react";
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
import JNFFacilities from "../components/jnf/JNFFacilities";
import JNFSubmitSection from "../components/jnf/JNFSubmitSection";

export default function JNFForm() {
  const navigate = useNavigate();
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

  const totalSteps = 7;

  useEffect(() => {
    localStorage.setItem(
      "jnfDraft",
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

  return (
    <FormLayout>
      <FormStepper
        title="Job Notification Form"
        currentStep={currentStep}
        totalSteps={totalSteps}
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

            <JNFFacilities />

            <JNFSubmitSection
              onPrevious={previousStep}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </form>
    </FormLayout>
  );
}