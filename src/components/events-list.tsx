import EventCard from "./event-card";
import { getEvents } from "@/lib/utils";
import PaginationControls from "./pagination-controls";

export default async function EventsList({
  city,
  page = 1,
}: {
  city: string;
  page?: number;
}) {
  const { events, totalPages } = await getEvents(city, page);

  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : "";
  const nextPath = page < totalPages ? `/events/${city}?page=${page + 1}` : "";

  return (
    <section className="max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
