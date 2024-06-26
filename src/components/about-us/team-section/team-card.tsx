import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

export type TeamCardProps = {
  name: string;
  role: string;
  image: StaticImageData;
  description: ReactNode;
};
export default function TeamCard({
  name,
  role,
  image,
  description,
}: TeamCardProps) {
  return (
    <div
      // applying z index to the card - to prevent shifting of the description when hovered.
      className='bg-neutral-100 rounded-2xl flex flex-col text-center items-center gap-3 group/card z-0
      sm:flex-row sm:w-full
      md:items-stretch
      '
    >
      <Image
        src={image}
        width={120}
        height={180}
        placeholder='blur'
        alt="Founder's Image"
        className='-translate-y-2 group rounded-2xl transition-all
        sm:translate-y-0
        md:object-cover md:group-hover/card:scale-110'
      />
      {/* Card text */}
      <section
        className='px-4 pb-4 flex flex-col gap-3 
        sm:text-left
        md:self-center
        md:h-12 md:overflow-hidden md:group-hover/card:h-40 transition-height duration-400 ease-in-out'
      >
        <section aria-label='about member' className='flex flex-col gap-0.5'>
          <h3 className='text-lg text-neutral-950 font-bold'>{name}</h3>
          <h4 className='text-blue-500 text-sm'>{role}</h4>
        </section>
        <p
          className='text-neutral-600 [&>span]:text-neutral-950 [&>span]:font-bold text-center
          sm:text-left
          '
        >
          {description}
        </p>
      </section>
    </div>
  );
}
