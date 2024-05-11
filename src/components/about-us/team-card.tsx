import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

type Props = {
  name: string;
  role: string;
  image: StaticImageData;
  description: ReactNode;
};
export default function TeamCard({ name, role, image, description }: Props) {
  return (
    <div className='bg-neutral-100 rounded-2xl flex flex-col text-center items-center gap-3 px-4 pb-4'>
      <Image
        src={image}
        width={120}
        height={180}
        placeholder='blur'
        alt="Founder's Image"
        className='-translate-y-2 rounded-2xl'
      />
      <section aria-label='about founder'>
        <h3 className='text-lg text-neutral-950'>{name}</h3>
        <h4 className='text-blue-500 text-sm'>{role}</h4>
      </section>
      <p className='text-neutral-600 [&>span]:text-neutral-950 [&>span]:font-bold text-center'>
        {description}
      </p>
    </div>
  );
}
