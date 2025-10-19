export default function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="font-normal text-md mb-6 pb-2  border-cv-muted text-cv-white">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
}
