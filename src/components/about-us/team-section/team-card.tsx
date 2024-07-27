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
      className="group/card z-0 flex flex-col items-center gap-3 rounded-2xl bg-neutral-100 text-center sm:w-full sm:flex-row md:items-stretch"
    >
      <Image
        src={image}
        width={120}
        height={180}
        placeholder="blur"
        alt="Founder's Image"
        className="group -translate-y-2 rounded-2xl transition-all sm:translate-y-0 md:object-cover md:group-hover/card:scale-110"
      />
      {/* Card text */}
      <section className="flex flex-col gap-3 px-4 pb-4 duration-400 ease-in-out transition-height sm:text-left md:h-12 md:self-center md:overflow-hidden md:group-hover/card:h-40">
        <section aria-label="about member" className="flex flex-col gap-0.5">
          <h3 className="text-lg font-bold text-neutral-950">{name}</h3>
          <h4 className="text-sm text-blue-500">{role}</h4>
        </section>
        <p className="text-center text-neutral-600 sm:text-left [&>span]:font-bold [&>span]:text-neutral-950">
          {description}
        </p>
      </section>
    </div>
  );
}
