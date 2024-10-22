import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const btnStyles =
  "text-white flex items-center px-5 py-3 bg-white/5 rounded-md opacity-75 hover:opacity-100 transition text-sm";

export default function PaginationControls({
  previousPath,
  nextPath,
}: {
  previousPath: string;
  nextPath: string;
}) {
  return (
    <section className="flex justify-between w-full">
      {previousPath ? (
        <Link href={previousPath} className={btnStyles}>
          <ArrowLeftIcon className="w-6 h-6" />
          Previous
        </Link>
      ) : (
        <div />
      )}

      {nextPath ? (
        <Link href={nextPath} className={btnStyles}>
          Next
          <ArrowRightIcon className="w-6 h-6" />
        </Link>
      ) : (
        <div />
      )}
    </section>
  );
}
