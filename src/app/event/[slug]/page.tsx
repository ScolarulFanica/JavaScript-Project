import H1 from "@/components/h1";
import { getEvent } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const event = await getEvent(slug);
  return {
    title: event.name,
  };
}

export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const event = await getEvent(slug);
  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
        <Image
          src={event.imageUrl}
          className="object-cover  z-0 blur-3xl"
          alt="Event background image"
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw ,1280px"
          priority
        />
        <div className="z-1 flex flex-col lg:flex-row gap-6 lg:gap-x-16 relative">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />
          <div className="flex flex-col">
            <p className=" text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>

            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>

            <button className="bg-white/20 text-lg capitalize bg-blur mt-5 lg:mt-auto w-[95vw] rounded-md border-white/10 sm:w-full py-2 state-effects">
              Get tickets
            </button>
          </div>
        </div>
      </section>
      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section>
          <h2 className="text-2xl mb-8">About this event</h2>
          <p className="max-w-4xl mx-auto text-lg leading-8 text-white/75">
            {event.description}
          </p>
        </Section>

        <Section>
          <h2 className="text-2xl mb-8">Location</h2>
          <p className="max-w-4xl mx-auto text-lg leading-8 text-white/75">
            {event.location}
          </p>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}
