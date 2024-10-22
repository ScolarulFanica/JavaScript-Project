import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EventoEvent } from "./types";
import { notFound } from "next/navigation";

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getEvents(city: string, page = 1) {
  const url = `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`;
  const response = await fetch(url);

  const events: EventoEvent[] = await response.json();
  // Sort events by date
  events.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  //display 6 events per page
  const eventsPerPage = 6;
  const start = (page - 1) * eventsPerPage;
  const end = start + eventsPerPage;

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const paginatedEvents = events.slice(start, end);

  return {
    events: paginatedEvents,
    totalPages,
  };
}

export async function getEvent(slug: string) {
  const url = `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`;
  const response = await fetch(url);

  if (!response.ok) {
    notFound();
  }

  const event: EventoEvent = await response.json();

  return event;
}
