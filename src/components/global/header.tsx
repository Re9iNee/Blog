"use client";

import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import MoraLogo from "/public/logos/logo-small.svg";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { isLoggedIn } from "@/lib/utils";

const Header = () => {
  const { status } = useSession();

  return (
    <header
      className='px-2 py-4 flex justify-between max-w-screen-xl border-b sticky top-0 bg-background z-50 border-slate-100 dark:border-slate-800
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
        {isLoggedIn(status) && (
          <Link
            className='p-2 text-xs cursor-pointer  hidden sm:block'
            href={"/dashboard"}
          >
            Dashboard
          </Link>
        )}
        <Link
          className='p-2 text-xs cursor-pointer  hidden 
                    sm:block
                    '
          href={"/about-us"}
        >
          About Us
        </Link>
      </div>

      <div className='flex gap-4 items-center'>
        <Link
          target='_blank'
          href={"https://discord.gg/5TFMVKsgfK"}
          className='whitespace-nowrap px-5 py-2 text-white bg-gradient-to-l from-violet-500 to-violet-700 rounded-3xl leading-none text-xs font-bold cursor-pointer'
        >
          Join Community
        </Link>
        <RxHamburgerMenu className='cursor-pointer sm:hidden' />
      </div>
    </header>
  );
};

export default Header;
