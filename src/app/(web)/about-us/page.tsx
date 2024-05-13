import { Metadata } from "next";

import ArefehImage from "@/../public/about-us/team-pfp/arefeh.avif";
import MobinImage from "@/../public/about-us/team-pfp/mobin.avif";
import MoriImage from "@/../public/about-us/team-pfp/mori.avif";
import RezaImage from "@/../public/about-us/team-pfp/reza.avif";

import HeroSection from "@/components/about-us/hero-section/hero-section";
import HowSection from "@/components/about-us/how-section/how-section";
import TeamCard from "@/components/about-us/team-card";
import Uploader from "@/components/about-us/uploader";

export const metadata: Metadata = {
  title: "About us",
};

export default function AboutUsPage() {
  return (
    <section className='overflow-hidden'>
      <HeroSection />

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
