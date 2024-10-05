import { title, subtitle } from "@/components/primitives";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Welcome to blurt</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Just say what comes to mind...
        </h2>
        <div className="mt-8 flex gap-4 justify-center">
          <Button
            href="/feed"
            as={Link}
            color="default"
            variant="solid">
            Feed
          </Button>

          <Button
            href="/blog"
            as={Link}
            variant="solid">
            Blog
          </Button>
        </div>
      </div>
    </section>
  );
}
