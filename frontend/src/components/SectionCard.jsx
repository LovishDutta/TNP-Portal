export default function SectionCard({
  title,
  children,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">

      <h2 className="text-xl md:text-2xl font-semibold text-[#7A0019] mb-6">
        {title}
      </h2>

      {children}
    </div>
  );
}