import Image from "next/image";
import StarImage from "public/icons/star.avif";
import LittleFlame from "/public/images/little-flame.avif";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Chip from "../ui/chips";
import { Input } from "../ui/input";
import SearchInput from "./search-input";

export default function Search() {
  return (
    <section
      aria-label='search'
      className='hidden md:flex flex-col items-center justify-center min-h-80 relative gap-6 group'
    >
      <div className='absolute w-full h-full pointer-events-none' aria-hidden>
        <Image
          src={StarImage}
          alt='star icon'
          aria-hidden
          width={141}
          height={119}
          className='left-[52%] top-[4%] relative object-none transition-all group-hover:rotate-[60deg] group-hover:scale-110'
        />
      </div>

      <h2 className='text-neutral-950 font-poppins font-bold flex text-2xl'>
        Find your topic <span className='text-purple-600 ml-1'>Faster</span>
      </h2>

      <div className='relative w-4/6 max-w-[550px]'>
        <Image
          aria-hidden
          src={LittleFlame}
          placeholder={"empty"}
          alt='little flame icon'
          className='w-[57px] h-[67px] object-none absolute right-3 -top-[67px] transition-all group-hover:top-0 group-hover:scale-50'
        />

        <SearchInput className='pl-14 pr-20 text-md font-medium w-full min-h-14 shadow-xl rounded-2xl placeholder:text-neutral-400 relative' />
        <FaMagnifyingGlass className='w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-4 text-purple-600 pointer-events-none' />
        <div className='absolute top-1/2 transform -translate-y-1/2 right-4 text-neutral-500 pointer-events-none items-center gap-1 text-xs font-bold flex'>
          <EnterIcon />
          Enter
        </div>
      </div>

      <section aria-label='trending topics' className='space-y-3'>
        <h3 className='text-neutral-600 font-bold text-sm'>Trending Topics</h3>
        {/* chips container */}
        <div className='flex gap-2 p-1'>
          <Chip>#AI</Chip>
          <Chip>#DevX2024</Chip>
          <Chip>#Config2024</Chip>
          <Chip>#AnnualComp</Chip>
        </div>
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
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.3327 2.66748V7.33415C13.3327 8.04139 13.0517 8.71967 12.5516 9.21977C12.0515 9.71986 11.3733 10.0008 10.666 10.0008H2.66602'
        stroke='#737373'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
