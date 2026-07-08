import Navbar from "./Navbar";
import Footer from "./Footer";

export default function FormLayout({
  children,
}) {
  return (
    <>
      <Navbar />

      <main className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4">
          {children}
        </div>
      </main>

      <Footer />
    </>
  );
}