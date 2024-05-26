import { FaMagnifyingGlass } from "react-icons/fa6";
import Chip from "../ui/chips";
import { Input } from "../ui/input";
import StarImage from "public/icons/star.avif";
import StarIcon from "public/icons/star.svg";
import Image from "next/image";

export default function Search() {
  return (
    <section
      aria-label='search'
      className='hidden md:flex flex-col items-center justify-center min-h-80 relative bg-yellow-500 gap-6'
    >
      <div className='absolute w-full h-full' aria-hidden>
        <Image
          src={StarImage}
          alt='star icon'
          aria-hidden
          width={141}
          height={119}
          className='left-[48%] top-[4%] relative'
        />
      </div>

      <h2 className='text-neutral-950 font-poppins font-bold flex'>
        Find your topic <span className='text-purple-600 ml-1'>Faster</span>
      </h2>
      <div className='relative w-4/6'>
        <FaMagnifyingGlass className='w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-4 text-purple-600 pointer-events-none' />
        <Input
          type='text'
          placeholder='Find your topic here...'
          className='pl-14 pr-20 text-md w-full min-h-14 shadow-xl rounded-2xl placeholder:text-neutral-400'
        />
        <div className='hidden absolute top-1/2 transform -translate-y-1/2 right-4 text-neutral-500 pointer-events-none items-center gap-0.5 text-xs font-bold'>
          <EnterIcon />
          Enter
        </div>
      </div>
      <section aria-label='trending topics'>
        <h3 className='text-neutral-600 font-bold text-xs'>Trending Topics</h3>
        <Chip>#AI</Chip>
      </section>
    </section>
  );
}

function EnterIcon() {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.99935 6.66748L2.66602 10.0008L5.99935 13.3341'
        stroke='#737373'
        style={{ stroke: "#737373" }}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M13.3327 2.66748V7.33415C13.3327 8.04139 13.0517 8.71967 12.5516 9.21977C12.0515 9.71986 11.3733 10.0008 10.666 10.0008H2.66602'
        stroke='#737373'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
