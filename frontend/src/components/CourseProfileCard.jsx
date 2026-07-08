export default function CourseProfileCard({
  title,
  children,
}) {
  return (
    <div className="border border-gray-200 rounded-2xl p-6">

      <h3 className="text-lg font-semibold text-[#7A0019] mb-5">
        {title}
      </h3>

      <div className="grid md:grid-cols-2 gap-5">
        {children}
      </div>

    </div>
  );
}