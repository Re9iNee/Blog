import Image, { StaticImageData } from "next/image";
import PatternImage from "./pattern-image";
import { ReactNode } from "react";

export type HowSectionProps = {
  ariaLabel: string;
  header: ReactNode;
  paragraph: ReactNode;
  patternImage: StaticImageData;
  illustrationImage: { src: StaticImageData; alt: string };
};
export default function HowSectionCard({
  header,
  paragraph,
  ariaLabel,
  patternImage,
  illustrationImage,
}: HowSectionProps) {
  return (
    <section
      className="flex flex-col items-center gap-4 sm:relative sm:max-h-[416px] sm:flex-row-reverse sm:px-4 sm:pb-32 md:pb-40"
      aria-label={ariaLabel}
    >
      <PatternImage src={patternImage} />
      <Image
        aria-hidden
        width={220}
        height={260}
        placeholder="blur"
        src={illustrationImage.src}
        alt={illustrationImage.alt}
        // applies z-10 to be the upper layer of the pattern behind it.
        className="pointer-events-none sm:z-10 sm:h-72 sm:w-72"
      />
      <section aria-label="section text" className="sm:text-left">
        <h3
          className="flex flex-col p-2 font-poppins text-xl font-bold text-neutral-800 sm:text-2xl lg:text-3xl"
          dangerouslySetInnerHTML={{ __html: header ?? "" }}
        />
        <p className="p-2 text-neutral-500 lg:text-lg">{paragraph}</p>
      </section>
    </section>
  );
}
