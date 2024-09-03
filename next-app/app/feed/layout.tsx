export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <div className="inline-block max-w-lg">
        {children}
      </div>
    </section>
  );
}
