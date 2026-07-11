import SectionCard from "../SectionCard";
import CheckboxGroup from "../CheckboxGroup";

const UG_BRANCHES = [
  "Computer Engineering",
  "Information Technology",
  "Electronics & Communication Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Mathematics & Computing",
  "Artificial Intelligence & Machine Learning (AIML)",
  "Industrial Internet of Things (IIOT)",
  "Production & Industrial Engineering",
];

const MINOR_DEGREES = [
  "Computing & Intelligence",
  "Unmanned Aerial Systems",
];

export default function JNFCoursesSection({
  formData,
  setFormData,
  setValidationMessage,
}) {
  const toggleSelection = (field, option) => {
  setValidationMessage("");

  setFormData((prev) => {
    const exists = prev[field].includes(option);

    return {
      ...prev,
      [field]: exists
        ? prev[field].filter(
            (item) => item !== option
          )
        : [...prev[field], option],
    };
  });
};
  return (
    <SectionCard title="Courses Considered for Recruitment">
      <div className="space-y-10">

        <CheckboxGroup
          label="Undergraduate Programme (B.Tech)"
          options={UG_BRANCHES}
          selected={formData.ugBranches}
          onChange={(option) =>
            toggleSelection(
              "ugBranches",
              option
            )
          }
        />

        <CheckboxGroup
          label="Minor Degree (UG)"
          options={MINOR_DEGREES}
          selected={formData.minorDegrees}
          onChange={(option) =>
            toggleSelection(
              "minorDegrees",
              option
            )
          }
        />

        <div>
          <h3 className="text-lg font-semibold mb-6">
            Post Graduate Programme
            (M.Tech / MCA / MBA / M.Sc)
          </h3>

          <div className="space-y-8">

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Computer Engineering
              </h4>
              <CheckboxGroup
                label=""
                options={[
                  "M.Tech Computer Engineering specialization in Cyber Security",
                  "M.Tech Computer Engineering specialization in computer"
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) => toggleSelection("pgSpecializations", option)}
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Civil Engineering
              </h4>
              <CheckboxGroup
                label=""
                options={[
                  "Transportation Engineering",
                  "Structural Engineering",
                  "Geotechnical Engineering",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) => toggleSelection("pgSpecializations", option)}
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Electronics & Communication Engineering
              </h4>
              <CheckboxGroup
                label=""
                options={[
                  "Communication Systems",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) => toggleSelection("pgSpecializations", option)}
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Electrical Engineering
              </h4>
              <CheckboxGroup
                label=""
                options={[
                  "Power System",
                  "Power Electronics & Drives",
                  "Control System",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) => toggleSelection("pgSpecializations", option)}
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Energy Science & Engineering
              </h4>
              <CheckboxGroup
                label=""
                options={[
                  "Renewable Energy Systems",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) => toggleSelection("pgSpecializations", option)}
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Mechanical Engineering
              </h4>
              <CheckboxGroup
                label=""
                options={[
                  "Machine Design",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) => toggleSelection("pgSpecializations", option)}
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Robotics & Industrial Engineering
              </h4>
              <CheckboxGroup
                label=""
                options={[
                  "Production & Industrial Engineering",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) => toggleSelection("pgSpecializations", option)}
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                VLSI Design & Embedded Systems
              </h4>
              <CheckboxGroup
                label=""
                options={[
                  "VLSI Design",
                  "Embedded System Design",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) => toggleSelection("pgSpecializations", option)}
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Physics
              </h4>
              <CheckboxGroup
                label=""
                options={[
                  "M.Sc. (Physics)",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) => toggleSelection("pgSpecializations", option)}
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Chemistry
              </h4>
              <CheckboxGroup
                label=""
                options={[
                  "M.Sc. (Chemistry)",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) => toggleSelection("pgSpecializations", option)}
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Mathematics & Computing
              </h4>
              <CheckboxGroup
                label=""
                options={[
                  "M.Sc. (Mathematics)",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) => toggleSelection("pgSpecializations", option)}
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Humanities & Social Sciences
              </h4>
              <CheckboxGroup
                label=""
                options={[
                  "M.Sc. (Economics)",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) => toggleSelection("pgSpecializations", option)}
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Computer Applications
              </h4>
              <CheckboxGroup
                label=""
                options={[
                  "Master of Computer Applications (MCA)",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) => toggleSelection("pgSpecializations", option)}
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Business Administration
              </h4>
              <CheckboxGroup
                  label=""
                options={[
                  "MBA in HR",
                  "MBA in Finance",
                  "MBA in Marketing",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) => toggleSelection("pgSpecializations", option)}
              />
            </div>

          </div>
        </div>

      </div>
    </SectionCard>
  );
}