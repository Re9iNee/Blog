import Image, { StaticImageData } from "next/image";

export default function PatternImage({ src }: { src: StaticImageData }) {
  return (
    <Image
      src={src}
      aria-hidden
      width={530}
      height={300}
      placeholder='blur'
      alt='image of the pattern'
      className='hidden pointer-events-none sm:block absolute -right-24 scale-75 object-cover'
    />
  );
}
