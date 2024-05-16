import HeroImage from "@/../public/about-us/hero.avif";
import Image from "next/image";
import { CiCircleChevDown } from "react-icons/ci";

export default function HeroSection() {
  return (
    <>
      {" "}
      <section
        aria-label='hero-section'
        className='relative flex justify-center items-center h-[432px]
        sm:justify-start
        '
      >
        <Image
          fill
          sizes='100vw'
          quality={100}
          priority={true}
          src={HeroImage}
          alt='Hero Image'
          placeholder='blur'
          aria-hidden='true'
          className='object-cover'
        />
        <h2
          className='text-center font-poppins z-0 flex flex-col
          sm:text-left sm:p-4 sm:ml-4
          '
        >
          <span className='uppercase text-neutral-300 font-bold text-sm'>
            at mora
          </span>
          <span
            className='font-bold text-2xl text-neutral-50
            sm:text-3xl
            '
          >
            We aim to elevate the
          </span>
          <span
            className='font-bold text-2xl text-purple-500
            sm:text-3xl
            '
          >
            Educational Experience
          </span>
        </h2>
      </section>
      <button
        aria-hidden='true'
        className='rounded-full border-1 w-12 h-12 flex justify-center items-center relative -top-5 bg-white left-1/2 -translate-x-1/2
        md:w-16 md:h-16'
      >
        <CiCircleChevDown className='text-6xl text-violet-700' />
      </button>
    </>
  );
}
