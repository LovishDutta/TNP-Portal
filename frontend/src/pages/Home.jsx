import { useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, ChevronDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DemographicsContent from "../components/DemographicsContent";

export default function Home() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">

          <div className="text-center animate-fade-in-up">

            <img
              src="/nitkkr-logo.png"
              alt="NIT Kurukshetra"
              className="h-24 w-24 md:h-28 md:w-28 mx-auto mb-6"
            />

            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Training & Placement Cell
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-500 mt-2">
              Recruitment Registration Portal
            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed">
              Welcome to the official recruitment portal of the
              Training & Placement Cell, National Institute of
              Technology Kurukshetra. Recruiters may submit Job
              Notification Forms (JNF) and Internship Notification
              Forms (INF) through this portal.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14 items-stretch stagger-children">
            {/* Placement Policies Card */}
            <div
              className="bg-white rounded-2xl p-8 flex flex-col h-[475px] transition-all duration-300 hover:shadow-lg"
              style={{
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center tracking-tight">
                {/* Placement and Internship Policies */}
                Important Mentions
              </h2>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">                
                <ul className="space-y-4 text-gray-600 max-w-xl mx-auto">

  <li className="flex items-start">
    <span className="text-[#7A0019] mr-3 mt-1.5 flex-shrink-0">
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="4" cy="8" r="3" />
      </svg>
    </span>

    <div className="text-sm leading-relaxed">
      <strong>Second Offer Policy:</strong>

      <ul className="list-disc ml-5 mt-2 space-y-1">
        <li>
          The new opportunity must offer a CTC of at least
          <strong> 1.5× </strong>
          the student's current offer.
        </li>

        <li>
          The student's existing offer must have a CTC of
          <strong> ₹12 LPA or below.</strong>
        </li>

        <li>
          At least
          <strong> 50% of students </strong>
          from the respective department must have already been placed
          at the time of recruitment.
        </li>

        <li>
          If
          <strong> 80% or more students </strong>
          of a department have already been placed, the remaining eligible
          students of that department shall be allowed to participate in
          <strong> all subsequent campus recruitment drives, including
          PSU/Government Organization recruitment, irrespective of their
          existing CTC.</strong>
        </li>
      </ul>
    </div>
  </li>

  <li className="flex items-start">
    <span className="text-[#7A0019] mr-3 mt-1.5 flex-shrink-0">
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="4" cy="8" r="3" />
      </svg>
    </span>

    <div className="text-sm leading-relaxed">
      <strong>PSU Recruitment Policy:</strong>

      <ul className="list-disc ml-5 mt-2 space-y-1">
        <li>
          Students who have already secured an on-campus offer shall
          remain eligible to participate in recruitment drives conducted
          by
          <strong> Public Sector Undertakings (PSUs) </strong>
          and
          <strong> Government Organizations</strong>, subject to the
          eligibility criteria prescribed by the recruiting organization.
        </li>

        <li>
  Once a student receives an offer from a
  <strong> PSU/Government Organization</strong>, the student shall
  <strong> not be permitted to participate in the recruitment process of any other PSU/Government Organization.</strong>
</li>
      </ul>
    </div>
  </li>

  <li className="flex items-start">
    <span className="text-[#7A0019] mr-3 mt-1.5 flex-shrink-0">
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="4" cy="8" r="3" />
      </svg>
    </span>

    <span className="text-sm leading-relaxed">
      <strong>Bonus Company Policy:</strong> Companies offering a CTC of
      <strong> ₹5 LPA or below</strong> shall be classified as
      <strong> Bonus Companies</strong>. Students selected by a Bonus
      Company shall remain eligible to participate in all subsequent
      campus recruitment drives offering a higher CTC without any
      restriction arising from their earlier selection.
    </span>
  </li>

</ul>
              </div>
            </div>

            {/* Forms Card — back to just JNF/INF, no demographics box here anymore */}
            <div
              className="bg-white rounded-2xl p-8 flex flex-col h-[475px] transition-all duration-300 hover:shadow-lg"
              style={{
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >              
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center tracking-tight">
                Submit Notification Forms
              </h2>

<div className="flex-1 flex flex-col justify-start">                
  <div className="space-y-5">
                  <div className="p-5 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-gray-200 transition-all duration-200">
                    <h3 className="text-base font-semibold text-gray-800">Job Notification Form</h3>
                    <p className="mt-1 text-sm text-gray-500 mb-4">For final year students seeking full-time roles.</p>
                    <Link
                      to="/jnf"
                      className="block w-full text-center bg-[#7A0019] hover:bg-[#5C0013] text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm"
                      style={{ boxShadow: '0 1px 3px rgba(122, 0, 25, 0.2)' }}
                    >
                      Fill JNF
                    </Link>
                  </div>

                  <div className="p-5 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-gray-200 transition-all duration-200">
                    <h3 className="text-base font-semibold text-gray-800">Internship Notification Form</h3>
                    <p className="mt-1 text-sm text-gray-500 mb-4">For pre-final year students seeking internships.</p>
                    <Link
                      to="/inf"
                      className="block w-full text-center bg-[#7A0019] hover:bg-[#5C0013] text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm"
                      style={{ boxShadow: '0 1px 3px rgba(122, 0, 25, 0.2)' }}
                    >
                      Fill INF
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Batch Demographics — collapsible accordion, expands right here on the homepage */}
          <div className="mt-10 rounded-2xl overflow-hidden transition-all duration-300" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <button
              onClick={() => setIsDemoOpen(prev => !prev)}
              className="w-full flex items-center justify-between gap-4 p-6 bg-white hover:bg-gray-50/60 transition-colors duration-200 text-left"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="bg-[#7A0019]/8 p-2.5 rounded-xl flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-[#7A0019]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate">Batch Strength Demographics</h3>
                  <p className="text-sm text-gray-500 truncate">View student demographics by batch, branch, and gender</p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${isDemoOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isDemoOpen && (
              <div className="border-t border-gray-100 p-6 sm:p-8 bg-[#FDFBF7]">
                <DemographicsContent />
              </div>
            )}
          </div>

          <div className="mt-20 border-t border-gray-100 pt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10 tracking-tight">
              Facilities We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">

              <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
                <div className="bg-[#7A0019]/8 p-3.5 rounded-xl mb-4">
                  <svg className="w-7 h-7 text-[#7A0019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Advanced Computing</h3>
                <p className="text-gray-500 text-sm leading-relaxed">250+ Computers equipped with high-speed internet and reliable power backup.</p>
              </div>

              <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
                <div className="bg-[#7A0019]/8 p-3.5 rounded-xl mb-4">
                  <svg className="w-7 h-7 text-[#7A0019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Virtual Interviews</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Dedicated Video Conferencing and online interview facilities for remote hiring.</p>
              </div>

              <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
                <div className="bg-[#7A0019]/8 p-3.5 rounded-xl mb-4">
                  <svg className="w-7 h-7 text-[#7A0019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Guest House</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Complimentary accommodation with moderate facilities on campus (subject to availability).</p>
              </div>

              <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xs)' }}>
                <div className="bg-[#7A0019]/8 p-3.5 rounded-xl mb-4">
                  <svg className="w-7 h-7 text-[#7A0019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Local Transport</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Convenient pick & drop facilities and excellent hospitality for visiting officials.</p>
              </div>

            </div>
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}