"use client";

import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import MoraLogo from "/public/logos/logo-small.svg";

const Header = () => {
  return (
    <header
      className='px-2 py-4 flex justify-between max-w-screen-xl border-b border-slate-100 dark:border-slate-800
      md:p-4
      '
    >
      <div className='inline-flex items-center gap-2'>
        <Link href={"/"} className='p-2 flex gap-1 items-center cursor-pointer'>
          <MoraLogo />

          <span className='text-indigo-600 text-sm font-semibold italic leading-3'>
            BLOGS
          </span>
        </Link>
        <Link
          className='p-2 text-xs cursor-pointer hidden 
                    sm:block
                    '
          href={"/contact-us"}
        >
          Contact Us
        </Link>
        <Link
          target='_blank'
          href={"https://mora-website.vercel.app/"}
          className='p-2 text-xs hidden cursor-pointer
                    sm:block
                    '
        >
          Mora Website
        </Link>
      </div>

      <div className='flex gap-4 items-center'>
        <button className='whitespace-nowrap px-3 py-2 h-8 text-white bg-gradient-to-l from-violet-500 to-violet-700 rounded-3xl leading-none text-xs font-bold cursor-pointer'>
          Join Community
        </button>
        <RxHamburgerMenu className='cursor-pointer sm:hidden' />
      </div>
    </header>
  );
};

export default Header;
