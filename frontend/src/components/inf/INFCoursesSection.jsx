import SectionCard from "../SectionCard";
import CheckboxGroup from "../CheckboxGroup";

const UG_BRANCHES = [
  "Civil Engineering",
  "Computer Engineering",
  "Information Technology",
  "Artificial Intelligence & Machine Learning",
  "Industrial Internet of Things",
  "Mathematics & Computing",
  "Electronics & Communication Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Production & Industrial Engineering",
  "Artificial Intelligence & Data Science",
  "Robotics & Automation",
  "Sustainable Energy Technologies",
  "Microelectronics & VLSI",
];

export default function INFCoursesSection({
  formData,
  setFormData,
}) {
  const toggleSelection = (field, option) => {
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
    <SectionCard title="Courses Considered">
      <div className="space-y-10">

        <CheckboxGroup
          label="Undergraduate Programmes"
          options={UG_BRANCHES}
          selected={formData.ugBranches}
          onChange={(option) =>
            toggleSelection(
              "ugBranches",
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
                  "Computer Engineering / Cyber Security",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) =>
                  toggleSelection(
                    "pgSpecializations",
                    option
                  )
                }
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
                onChange={(option) =>
                  toggleSelection(
                    "pgSpecializations",
                    option
                  )
                }
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
                onChange={(option) =>
                  toggleSelection(
                    "pgSpecializations",
                    option
                  )
                }
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Civil Engineering
              </h4>

              <CheckboxGroup
                label=""
                options={[
                  "Environmental Engineering",
                  "Water Resources Engineering",
                  "Transportation Engineering",
                  "Structural Engineering",
                  "Geotechnical Engineering",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) =>
                  toggleSelection(
                    "pgSpecializations",
                    option
                  )
                }
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Mechanical Engineering
              </h4>

              <CheckboxGroup
                label=""
                options={[
                  "Thermal Engineering",
                  "Instrumentation",
                  "Machine Design",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) =>
                  toggleSelection(
                    "pgSpecializations",
                    option
                  )
                }
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Production & Industrial Engineering
              </h4>

              <CheckboxGroup
                label=""
                options={[
                  "Production & Industrial Engineering",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) =>
                  toggleSelection(
                    "pgSpecializations",
                    option
                  )
                }
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                School of Renewable Energy & Efficiency
              </h4>

              <CheckboxGroup
                label=""
                options={[
                  "Renewable Energy Systems",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) =>
                  toggleSelection(
                    "pgSpecializations",
                    option
                  )
                }
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                School of VLSI Design & Embedded Systems
              </h4>

              <CheckboxGroup
                label=""
                options={[
                  "VLSI Design",
                  "Embedded System Design",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) =>
                  toggleSelection(
                    "pgSpecializations",
                    option
                  )
                }
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                MCA
              </h4>

              <CheckboxGroup
                label=""
                options={[
                  "Master of Computer Applications (MCA)",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) =>
                  toggleSelection(
                    "pgSpecializations",
                    option
                  )
                }
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                MBA
              </h4>

              <CheckboxGroup
                label=""
                options={[
                  "Master of Business Administration (MBA)",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) =>
                  toggleSelection(
                    "pgSpecializations",
                    option
                  )
                }
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                M.Sc.
              </h4>

              <CheckboxGroup
                label=""
                options={[
                  "Physics",
                  "Chemistry",
                  "Mathematics",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) =>
                  toggleSelection(
                    "pgSpecializations",
                    option
                  )
                }
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#7A0019] mb-3">
                Physics
              </h4>

              <CheckboxGroup
                label=""
                options={[
                  "Nanomaterials and Nanotechnology",
                ]}
                selected={formData.pgSpecializations}
                onChange={(option) =>
                  toggleSelection(
                    "pgSpecializations",
                    option
                  )
                }
              />
            </div>

          </div>
        </div>

      </div>
    </SectionCard>
  );
}