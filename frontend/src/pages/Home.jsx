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
              <h2 className="text-2xl font-bold text-gray-900">
                Job Notification Form
              </h2>

              <p className="mt-3 text-gray-600">
                For final year students.
              </p>

              <Link
                to="/jnf"
                className="inline-block mt-6 bg-[#7A0019] hover:bg-[#650015] text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Fill JNF
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-md border p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Internship Notification Form
              </h2>

              <p className="mt-3 text-gray-600">
                For pre-final year students.
              </p>

              <Link
                to="/inf"
                className="inline-block mt-6 bg-[#7A0019] hover:bg-[#650015] text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Fill INF
              </Link>
            </div>

          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}