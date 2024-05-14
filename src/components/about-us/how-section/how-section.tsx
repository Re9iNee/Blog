import illustrationOneImage from "@/../public/about-us/illustration-1.avif";
import illustrationTwoImage from "@/../public/about-us/illustration-2.avif";
import illustrationThreeImage from "@/../public/about-us/illustration-3.avif";

import patternOne from "@/../public/about-us/pattern-1.avif";
import patternTwo from "@/../public/about-us/pattern-2.avif";
import patternThree from "@/../public/about-us/pattern-3.avif";
import HowSectionCard, { HowSectionProps } from "./how-section-card";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

const HowSectionData: HowSectionProps[] = [
  {
    patternImage: patternOne,
    ariaLabel: "better control and easier management section",
    header: "<span>Better Control &</span> Easier Management",
    illustrationImage: {
      src: illustrationOneImage,
      alt: "illustration of a desktop image",
    },
    paragraph:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illo iusto cum labore eius. Quaerat deleniti, autem suscipit, delectus nemo laudantium eos illo, ex quisquam quos maxime dolor error architecto?",
  },
  {
    patternImage: patternTwo,
    ariaLabel: "better control and easier management section",
    header: "<span>Improved Insights &</span> Reporting Systems",
    illustrationImage: {
      src: illustrationTwoImage,
      alt: "illustration of a dashboard image",
    },
    paragraph:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illo iusto cum labore eius. Quaerat deleniti, autem suscipit, delectus nemo laudantium eos illo, ex quisquam quos maxime dolor error architecto?",
  },
  {
    patternImage: patternThree,
    ariaLabel: "online presence and audience growth section",
    header: "<span>Online Presence &</span> Audience Growth",
    illustrationImage: {
      src: illustrationThreeImage,
      alt: "illustration of diagrams",
    },
    paragraph:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illo iusto cum labore eius. Quaerat deleniti, autem suscipit, delectus nemo laudantium eos illo, ex quisquam quos maxime dolor error architecto?",
  },
];

type Props = {
  className?: ClassValue;
};
export default function HowSection({ className }: Props) {
  return (
    <section
      aria-label='infos'
      className={cn(
        className,
        "flex flex-col items-center text-center font-poppins"
      )}
    >
      <h2 className='flex flex-col gap-2 py-12'>
        <span
          className='text-neutral-600 text-sm
            sm:text-base
            lg:text-lg
            '
        >
          How We
        </span>
        <span
          className='font-bold text-2xl
            sm:text-3xl
            lg:text-4xl
            '
        >
          <span className='text-purple-500'>Envision</span>{" "}
          <span className='text-neutral-800'>the Education</span>
        </span>
      </h2>

      {HowSectionData.map((data) => (
        <HowSectionCard
          key={data.ariaLabel}
          header={data.header}
          ariaLabel={data.ariaLabel}
          paragraph={data.paragraph}
          patternImage={data.patternImage}
          illustrationImage={data.illustrationImage}
        />
      ))}
    </section>
  );
}
