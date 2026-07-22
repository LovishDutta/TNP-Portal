const infInitialState = {

  undertakingAccepted: false,
  formFillerName: "",
  formFillerDesignation: "",

  companyName: "",
  website: "",
  category: [],
  categoryOther: "",
  hiringType: "",
  companyOverview: "",
  internshipType: "",   // Step 2 ke liye (Internship Type: Only/FTE/PPO) — separate rakha


  minimumCGPA: "",
  medicalCondition: "",
  otherCriteria: "",
  backlogsAllowed: "",
  historyOfBacklogsAllowed: "",


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


  sponsorEvents: "",
  studentCompetitions: "",
  competitionDetails: "",


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


  ugBranches: [],
  dualDegreeBranches: [],
  pgSpecializations: [],


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