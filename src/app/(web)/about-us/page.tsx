import HeroImage from "@/../public/about-us/hero.jpg";
import { Metadata } from "next";
import Image from "next/image";

import ArefehImage from "@/../public/about-us/team-pfp/arefeh.avif";
import MobinImage from "@/../public/about-us/team-pfp/mobin.avif";
import MoriImage from "@/../public/about-us/team-pfp/mori.avif";
import RezaImage from "@/../public/about-us/team-pfp/reza.avif";

import HowSection from "@/components/about-us/how-section/how-section";
import TeamCard from "@/components/about-us/team-card";
import Uploader from "@/components/about-us/uploader";
import { CiCircleChevDown } from "react-icons/ci";

export const metadata: Metadata = {
  title: "About us",
};

export default function AboutUsPage() {
  return (
    <section>
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
          objectFit='cover'
          placeholder='blur'
          aria-hidden='true'
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
        className='rounded-full border-1 w-12 h-12 flex justify-center items-center relative -top-5 bg-white left-1/2 -translate-x-1/2'
      >
        <CiCircleChevDown className='text-6xl text-violet-700' />
      </button>

      <HowSection />

      {/* Team section */}
      <section aria-label='meet the team' className='mx-4 pb-12 mb-4'>
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

        <section
          aria-label='we are expanding our team'
          className='flex flex-col items-center pb-12'
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
    </section>
  );
}
