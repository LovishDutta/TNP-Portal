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
  // internshipType: "",   // Step 2 ke liye (Internship Type: Only/FTE/PPO) — separate rakha


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
      signature: "",
    },
    {
      name: "",
      designation: "",
      mobile: "",
      email: "",
      signature: "",
    },
  ],


  ugBranches: [],
  dualDegreeBranches: [],
  pgSpecializations: [],


  internshipProfiles: {
  btech: {
    designation: "",
    ctc: "",
    stipend: "",
    internshipDuration: "",
    location: "",
  },
  mba: {
    designation: "",
    ctc: "",
    stipend: "",
    internshipDuration: "",
    location: "",
  },
  mca: {
    designation: "",
    ctc: "",
    stipend: "",
    internshipDuration: "",
    location: "",
  },
  dualDegree: {
    designation: "",
    ctc: "",
    stipend: "",
    internshipDuration: "",
    location: "",
  },
  },
};

export default infInitialState;