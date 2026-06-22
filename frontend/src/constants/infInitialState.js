const infInitialState = {
  // Company Details
  companyName: "",
  emailAddress: "",
  website: "",
  companyType: "",
  companyTypeOther: "",
  domain: "",
  domainOther: "",
  organisationDescription: "",

  // Eligibility
  minimumCGPA: "",
  medicalCondition: "",
  otherCriteria: "",

  // Selection Process
  resumeShortlisting: "",
  preferredVisitDate: "",
  prePlacementTalk: "",
  writtenTest: "",
  aptitudeTest: "",
  technicalTest: "",
  testMode: "",
  groupDiscussion: "",
  technicalInterview: "",
  hrInterview: "",

  // Better Understanding
  sponsorEvents: "",
  studentCompetitions: "",
  competitionDetails: "",

  // Contacts
  contacts: [
    {
      name: "",
      designation: "",
      mobile: "",
      email: "",
    },
    {
      name: "",
      designation: "",
      mobile: "",
      email: "",
    },
  ],

  // Courses Considered
  ugBranches: [],
  pgSpecializations: [],

  // Internship Profiles
  internshipProfiles: {
    btech: {
      designation: "",
      stipend: "",
      gross: "",
      perks: "",
      trainingPeriod: "",
      location: "",
    },

    mca: {
      designation: "",
      stipend: "",
      gross: "",
      perks: "",
      trainingPeriod: "",
      location: "",
    },

    mtech: {
      designation: "",
      stipend: "",
      gross: "",
      perks: "",
      trainingPeriod: "",
      location: "",
    },

    mba: {
      designation: "",
      stipend: "",
      gross: "",
      perks: "",
      trainingPeriod: "",
      location: "",
    },

    msc: {
      designation: "",
      stipend: "",
      gross: "",
      perks: "",
      trainingPeriod: "",
      location: "",
    },
  },
};

export default infInitialState;