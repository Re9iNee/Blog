import HeroImage from "@/../public/about-us/hero.jpg";
import { Metadata } from "next";
import Image from "next/image";

import illustrationOneImage from "@/../public/about-us/illustration-1.avif";
import illustrationTwoImage from "@/../public/about-us/Illustration-2.png";
import illustrationThreeImage from "@/../public/about-us/Illustration-3.png";

import ArefehImage from "@/../public/about-us/team-pfp/arefeh.avif";
import MobinImage from "@/../public/about-us/team-pfp/mobin.avif";
import MoriImage from "@/../public/about-us/team-pfp/mori.avif";
import RezaImage from "@/../public/about-us/team-pfp/reza.avif";

import TeamCard from "@/components/about-us/team-card";
import Uploader from "@/components/about-us/uploader";
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

      <section aria-label='meet the team' className='mx-4'>
        <h2 className='flex flex-col gap-2 py-12 items-center'>
          <span className='text-neutral-600 text-sm'>Meet the</span>
          <span className='text-purple-500 font-bold text-2xl'>Mora Team</span>
        </h2>

        <section
          aria-label="team's info"
          className='flex flex-col items-center gap-10'
        >
          <TeamCard
            image={MoriImage}
            name='Morteza Ajidanpour'
            role='Founder & Product Designer'
            description={
              <>
                I create digital products that meet user&apos;s needs and are
                accessible to everyone. I am{" "}
                <span>passionate about creating intuitive interfaces</span> that
                people enjoy using on a daily basis.
              </>
            }
          />
          <TeamCard
            image={MobinImage}
            name='Mobin Khani'
            role='Co-Founder & Financial Analyst'
            description={
              <>
                I create digital products that meet user&apos;s needs and are
                accessible to everyone. I am{" "}
                <span>passionate about creating intuitive interfaces</span> that
                people enjoy using on a daily basis.
              </>
            }
          />
          <TeamCard
            image={RezaImage}
            name='Reza Attarzadeh'
            role='Co-Founder & Full Stack Developer'
            description={
              <>
                I create digital products that meet user&apos;s needs and are
                accessible to everyone. I am{" "}
                <span>passionate about creating intuitive interfaces</span> that
                people enjoy using on a daily basis.
              </>
            }
          />
          <TeamCard
            image={ArefehImage}
            name='Arefeh Kazemi'
            role='Co-Founder & Digital Marketing'
            description={
              <>
                I create digital products that meet user&apos;s needs and are
                accessible to everyone. I am{" "}
                <span>passionate about creating intuitive interfaces</span> that
                people enjoy using on a daily basis.
              </>
            }
          />
        </section>
      </section>

      <section
        aria-label='we are expanding our team'
        className='flex flex-col items-center mx-4 pb-12'
      >
        <h2 className='font-poppins text-neutral-600 pt-16 pb-4'>
          We&apos;re Expanding our Team
        </h2>

        <section
          aria-label='upload cv section'
          className='flex rounded-2xl bg-neutral-50 gap-4'
        >
          <Uploader />
          <div className='flex flex-col justify-center'>
            <h3 className='font-bold text-lg text-neutral-950'>
              Want to join Mora?
            </h3>
            <h4 className='text-neutral-600 text-xs'>
              We&apos;re alway open to acquiring talents
            </h4>
          </div>
        </section>
      </section>
    </section>
  );
}
