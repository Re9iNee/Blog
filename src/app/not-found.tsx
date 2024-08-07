import GoBackButton from "@/components/global/GoBackButton";
import { Button } from "@/components/ui/button";
import { notoSans, outfit } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Not Found",
  description: "The page you are looking for is not found.",
  openGraph: {
    siteName: "Mora Blog",
    url: `https://www.mora-ed.com/404`,
    title: "404 Not Found | Mora Blog",
    description: "The page you are looking for is not found.",
    images: ["/404/og.png", { url: "/404/og.png", alt: "404 Not Found" }],
  },
  twitter: {
    card: "summary_large_image",
    description: "The page you are looking for is not found.",
  },
};

export default function NotFound() {
  return (
    <div
      role="alert"
      aria-label="404 Not Found"
      className="flex min-h-screen flex-col items-center justify-center p-4 lg:flex-row lg:gap-8"
    >
      <div className="flex items-center">
        <FourIcon />
        <Image
          width={230}
          height={230}
          alt="planet icon"
          placeholder="blur"
          aria-hidden="true"
          src="/404/Planet.gif"
          blurDataURL="/404/Planet.svg"
        />
        <FourIcon />
      </div>
      <div className="flex flex-col justify-center lg:max-w-96 lg:items-start">
        <section
          aria-label="info"
          className="mb-14 flex flex-col gap-4 text-center md:gap-6 lg:mb-14 lg:text-left"
        >
          <h1 className="font-poppins text-xl font-bold text-purple-600 sm:text-2xl md:text-4xl">
            Oops, We didn&apos;t find the page
          </h1>
          <h3
            className={cn(
              "text-sm text-gray-500",
              outfit.className,
              "md:text-lg",
            )}
          >
            Check if you have typed the correct link or the link isn&apos;t
            expired.
          </h3>
        </section>
        <section
          aria-label="actions"
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <GoBackButton
            className={cn(
              "rounded-2xl border-none bg-neutral-100 font-bold text-neutral-950",
              notoSans.className,
              "dark:bg-neutral-800 dark:text-neutral-50",
            )}
          >
            Go Back
          </GoBackButton>
          <Button
            asChild
            variant={"outline"}
            className={cn(
              "rounded-2xl border-none bg-neutral-100 font-bold text-neutral-950",
              notoSans.className,
              "dark:bg-neutral-800 dark:text-neutral-50",
            )}
          >
            <Link href="/">Return Home</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
function FourIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 63 82"
      className="h-20 w-16 md:h-28 md:w-20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 65.4845L10.5463 4.61972H25.9889L15.8278 65.4845H0.5ZM0.5 65.4845L9.51296 51.5676H40.6852V65.4845H0.5ZM53.487 65.4845V51.5676H62.5V65.4845H53.487ZM39.537 82V0H54.6352V82H39.537Z"
        fill="#BF7BFB"
      />
    </svg>
  );
}
