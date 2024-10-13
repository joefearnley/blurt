export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col justify-center gap-4">
      <div className="inline-block max-w-lg">
        {children}
      </div>
    </section>
  );
}
