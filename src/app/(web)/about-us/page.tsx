import { Metadata } from "next";
import Image from "next/image";
import HeroImage from "@/../public/about-us/hero.jpg";

export const metadata: Metadata = {
  title: "About us",
};

export default function AboutUsPage() {
  return (
    <section className=''>
      <div
        aria-label='hero-section'
        className='relative h-screen flex justify-center items-center'
      >
        <Image
          fill
          sizes='100vw'
          quality={100}
          priority={true}
          src={HeroImage}
          alt='Hero Image'
          objectFit='cover'
          placeholder='blur'
          aria-hidden='true'
        />
        <h2 className='text-center font-poppins z-0 flex flex-col'>
          <span className='uppercase text-neutral-300 font-bold text-sm'>
            at mora
          </span>
          <span className='font-bold text-2xl text-neutral-50'>
            We aim to elevate the
          </span>
          <span className='font-bold text-2xl text-purple-500'>
            Educational Experience
          </span>
        </h2>
      </div>
    </section>
  );
}
