import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">

          <div className="text-center">

            <img
              src="/nitkkr-logo.png"
              alt="NIT Kurukshetra"
              className="h-24 w-24 md:h-32 md:w-32 mx-auto mb-6"
            />


            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Training & Placement Cell
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700">
              Recruitment Portal
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg">
              Welcome to the official recruitment portal of the
              Training & Placement Cell, National Institute of
              Technology Kurukshetra. Recruiters may submit Job
              Notification Forms (JNF) and Internship Notification
              Forms (INF) through this portal.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">

            <div className="bg-white rounded-2xl shadow-md border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Rules and Regulations
              </h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#7A0019] mr-2 font-bold">•</span>
                  <span>All information provided in the notification forms must be accurate and verifiable.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#7A0019] mr-2 font-bold">•</span>
                  <span>Once submitted, forms cannot be modified without prior approval from the T&P Cell.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#7A0019] mr-2 font-bold">•</span>
                  <span>Companies are expected to adhere strictly to the agreed-upon compensation structure.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#7A0019] mr-2 font-bold">•</span>
                  <span>Pre-Placement Offers (PPOs) must be routed exclusively through the Training & Placement Cell.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md border p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Submit Notification Forms
              </h2>
              
              <div className="space-y-6">
                <div className="p-5 rounded-xl border border-gray-100 bg-gray-50 hover:border-gray-200 transition">
                  <h3 className="text-lg font-semibold text-gray-800">Job Notification Form</h3>
                  <p className="mt-1 text-sm text-gray-500 mb-4">For final year students seeking full-time roles.</p>
                  <Link
                    to="/jnf"
                    className="block w-full text-center bg-[#7A0019] hover:bg-[#650015] text-white px-4 py-2.5 rounded-lg font-medium transition"
                  >
                    Fill JNF
                  </Link>
                </div>

                <div className="p-5 rounded-xl border border-gray-100 bg-gray-50 hover:border-gray-200 transition">
                  <h3 className="text-lg font-semibold text-gray-800">Internship Notification Form</h3>
                  <p className="mt-1 text-sm text-gray-500 mb-4">For pre-final year students seeking internships.</p>
                  <Link
                    to="/inf"
                    className="block w-full text-center bg-[#7A0019] hover:bg-[#650015] text-white px-4 py-2.5 rounded-lg font-medium transition"
                  >
                    Fill INF
                  </Link>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-20 border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              Facilities We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="bg-[#7A0019]/10 p-4 rounded-full mb-4">
                  <svg className="w-8 h-8 text-[#7A0019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Advanced Computing</h3>
                <p className="text-gray-600 text-sm leading-relaxed">250+ Computers equipped with high-speed internet and reliable power backup.</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="bg-[#7A0019]/10 p-4 rounded-full mb-4">
                  <svg className="w-8 h-8 text-[#7A0019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Virtual Interviews</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Dedicated Video Conferencing and online interview facilities for remote hiring.</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="bg-[#7A0019]/10 p-4 rounded-full mb-4">
                  <svg className="w-8 h-8 text-[#7A0019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Guest House</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Complimentary accommodation with moderate facilities on campus (subject to availability).</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="bg-[#7A0019]/10 p-4 rounded-full mb-4">
                  <svg className="w-8 h-8 text-[#7A0019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Local Transport</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Convenient pick & drop facilities and excellent hospitality for visiting officials.</p>
              </div>

            </div>
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}