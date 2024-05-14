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
      className='bg-neutral-100 rounded-2xl flex flex-col text-center items-center gap-3 group/card
      sm:flex-row sm:w-full
      '
    >
      <Image
        src={image}
        width={120}
        height={180}
        placeholder='blur'
        alt="Founder's Image"
        className='-translate-y-2 rounded-2xl transition-all
        sm:group-hover/card:scale-110 sm:translate-y-0'
      />
      {/* Card text */}
      <section
        className='px-4 pb-4 
        sm:text-left'
      >
        <section aria-label='about founder'>
          <h3 className='text-lg text-neutral-950 font-bold'>{name}</h3>
          <h4 className='text-blue-500 text-sm'>{role}</h4>
        </section>
        <p
          className='text-neutral-600 [&>span]:text-neutral-950 [&>span]:font-bold text-center
            sm:hidden sm:group-hover/card:block sm:text-left'
        >
          {description}
        </p>
      </section>
    </div>
  );
}
