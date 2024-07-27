import HeroImage from "@/../public/about-us/hero.avif";
import Image from "next/image";
import { CiCircleChevDown } from "react-icons/ci";

export default function HeroSection() {
  return (
    <>
      {" "}
      <section
        aria-label="hero-section"
        className="relative flex h-[60vh] items-center justify-center sm:justify-start"
      >
        <Image
          fill
          sizes="100vw"
          quality={100}
          priority={true}
          src={HeroImage}
          alt="Hero Image"
          placeholder="blur"
          aria-hidden="true"
          className="rounded-b-2xl object-cover"
        />
        <h2 className="z-0 flex flex-col text-center font-poppins sm:ml-4 sm:p-4 sm:text-left">
          <span className="text-sm font-bold uppercase text-neutral-300">
            at mora
          </span>
          <span className="text-2xl font-bold text-neutral-50 sm:text-3xl">
            We aim to elevate the
          </span>
          <span className="text-2xl font-bold text-purple-500 sm:text-3xl">
            Educational Experience
          </span>
        </h2>
      </section>
      <a href="#how-we-envision-section">
        <button
          aria-hidden="true"
          className="relative -top-5 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-1 bg-white md:h-16 md:w-16"
        >
          <CiCircleChevDown className="text-6xl text-violet-700" />
        </button>
      </a>
    </>
  );
}
