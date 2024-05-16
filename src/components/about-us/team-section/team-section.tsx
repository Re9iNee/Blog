import Uploader from "@/components/about-us/uploader";
import TeamCard, { TeamCardProps } from "./team-card";

import ArefehImage from "@/../public/about-us/team-pfp/arefeh.avif";
import MobinImage from "@/../public/about-us/team-pfp/mobin.avif";
import MoriImage from "@/../public/about-us/team-pfp/mori.avif";
import RezaImage from "@/../public/about-us/team-pfp/reza.avif";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

const TeamData: TeamCardProps[] = [
  {
    description: (
      <>
        I create digital products that meet user&apos;s needs and are accessible
        to everyone. I am{" "}
        <span>passionate about creating intuitive interfaces</span> that people
        enjoy using on a daily basis.
      </>
    ),
    image: MoriImage,
    name: "Morteza Ajidanpour",
    role: "Founder & Product Designer",
  },
  {
    description: (
      <>
        I create digital products that meet user&apos;s needs and are accessible
        to everyone. I am{" "}
        <span>passionate about creating intuitive interfaces</span> that people
        enjoy using on a daily basis.
      </>
    ),
    image: MobinImage,
    name: "Mobin Khani",
    role: "Co-Founder & Financial Analyst",
  },
  {
    description: (
      <>
        I create digital products that meet user&apos;s needs and are accessible
        to everyone. I am{" "}
        <span>passionate about creating intuitive interfaces</span> that people
        enjoy using on a daily basis.
      </>
    ),
    image: ArefehImage,
    name: "Arefeh Kazemi",
    role: "Co-Founder & Digital Marketing",
  },
  {
    description: (
      <>
        I create digital products that meet user&apos;s needs and are accessible
        to everyone. I am{" "}
        <span>passionate about creating intuitive interfaces</span> that people
        enjoy using on a daily basis.
      </>
    ),
    image: RezaImage,
    name: "Reza Attarzadeh",
    role: "Co-Founder & Full Stack Developer",
  },
];

type Props = {
  className?: ClassValue;
};
export default function TeamSection({ className }: Props) {
  return (
    <section aria-label='meet the team' className={cn(className)}>
      <h2 className='flex flex-col gap-2 py-12 items-center'>
        <span
          className='text-neutral-600 text-sm
          sm:text-base lg:text-lg
          '
        >
          Meet the
        </span>
        <span
          className='text-purple-500 font-bold text-2xl
          sm:text-3xl lg:text-4xl
          '
        >
          Mora Team
        </span>
      </h2>

      <section
        aria-label="team's info"
        className='flex flex-col items-center gap-10 
        md:grid md:grid-cols-1 md:gap-6
        lg:gap-8 lg:grid-cols-2'
      >
        {TeamData.map((member) => (
          <TeamCard
            key={member.name}
            name={member.name}
            role={member.role}
            image={member.image}
            description={member.description}
          />
        ))}
      </section>

      {/* disabling this section since the uploader component design is not ready yet  */}
      {/* <section
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
      </section> */}
    </section>
  );
}
