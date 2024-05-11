import { Metadata } from "next";
import Image from "next/image";
import HeroImage from "@/../public/about-us/hero.jpg";
import illustrationOneImage from "@/../public/about-us/illustration-1.png";
import illustrationTwoImage from "@/../public/about-us/Illustration-2.png";
import illustrationThreeImage from "@/../public/about-us/Illustration-3.png";
import { CiCircleChevDown } from "react-icons/ci";

export const metadata: Metadata = {
  title: "About us",
};

export default function AboutUsPage() {
  return (
    <section className=''>
      <div
        aria-label='hero-section'
        className='relative flex justify-center items-center h-[432px]'
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
      <button
        aria-hidden='true'
        className='rounded-full border-1 w-12 h-12 flex justify-center items-center relative -top-5 bg-white left-1/2 -translate-x-1/2'
      >
        <CiCircleChevDown className='text-6xl text-violet-700' />
      </button>

      <section
        aria-label='infos'
        className='flex flex-col items-center text-center font-poppins mb-24'
      >
        <h2 className='flex flex-col gap-2 py-12'>
          <span className='text-neutral-600 text-sm'>How We</span>
          <span className='font-bold text-2xl'>
            <span className='text-purple-500'>Envision</span>{" "}
            <span className='text-neutral-800'>the Education</span>
          </span>
        </h2>
        <section
          className='flex flex-col items-center gap-4'
          aria-label='better control and easier management section'
        >
          <Image
            aria-hidden
            width={220}
            height={260}
            placeholder='blur'
            src={illustrationOneImage}
            alt='illustration of a desktop image'
          />
          <h3 className='text-neutral-800 flex flex-col font-poppins font-bold text-xl'>
            <span>Better Control &</span> Easier Management
          </h3>
          <p className='text-neutral-500'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex libero
            dolores deleniti labore culpa at minima necessitatibus quae repellat
            praesentium nemo, hic tenetur odit quasi, distinctio aspernatur!
            Itaque, esse nesciunt.
          </p>
        </section>

        <section
          className='flex flex-col items-center gap-4'
          aria-label='improved insights & reporting systems section'
        >
          <Image
            aria-hidden
            width={220}
            height={260}
            placeholder='blur'
            src={illustrationTwoImage}
            alt='illustration of a dashboard image'
          />
          <h3 className='text-neutral-800 flex flex-col font-poppins font-bold text-xl'>
            <span>Improved Insights &</span> Reporting Systems
          </h3>
          <p className='text-neutral-500'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            error delectus expedita cumque dolor sapiente. Veniam aliquam dolore
            est, laborum autem facere quia? Perspiciatis vel nesciunt
            dignissimos, excepturi aspernatur suscipit?
          </p>
        </section>

        <section
          className='flex flex-col items-center gap-4'
          aria-label='online presence and audience growth section'
        >
          <Image
            aria-hidden
            width={220}
            height={260}
            placeholder='blur'
            src={illustrationThreeImage}
            alt='illustration of diagrams'
          />
          <h3 className='text-neutral-800 flex flex-col font-poppins font-bold text-xl'>
            <span>Online Presence &</span> Audience Growth
          </h3>
          <p className='text-neutral-500'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            nam temporibus, laborum ducimus animi debitis minima fugiat,
            distinctio culpa explicabo quos, esse officia? Nulla quidem
            quibusdam sit at perspiciatis tenetur?
          </p>
        </section>
      </section>
    </section>
  );
}
