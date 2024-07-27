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
    <header className="sticky top-0 z-50 flex max-w-screen-xl justify-between border-b border-slate-100 bg-background px-2 py-4 dark:border-slate-800 md:p-4">
      <div className="inline-flex items-center gap-2">
        <Link href={"/"} className="flex cursor-pointer items-center gap-1 p-2">
          <MoraLogo />

          <span className="text-sm font-semibold italic leading-3 text-indigo-600">
            BLOGS
          </span>
        </Link>
        {isLoggedIn(status) && (
          <Link
            className="hidden cursor-pointer p-2 text-xs sm:block"
            href={"/dashboard"}
          >
            Dashboard
          </Link>
        )}
        <Link
          className="hidden cursor-pointer p-2 text-xs sm:block"
          href={"/about-us"}
        >
          About Us
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link
          target="_blank"
          href={"https://discord.gg/5TFMVKsgfK"}
          className="cursor-pointer whitespace-nowrap rounded-3xl bg-gradient-to-l from-violet-500 to-violet-700 px-5 py-2 text-xs font-bold leading-none text-white"
        >
          Join Community
        </Link>
        <RxHamburgerMenu className="cursor-pointer sm:hidden" />
      </div>
    </header>
  );
};

export default Header;
