"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineMediumWorkmark } from "react-icons/ai";
import { FaMedium } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

function Header() {
  const pathname = usePathname();
  const headerBg = pathname.startsWith("/posts/")
    ? "bg-white"
    : "bg-yellow-500";

  return (
    <header className={`${headerBg}`} id='header'>
      <nav className='inline-flex p-4 gap-2 items-center justify-between w-full text-black'>
        <Link href={"/"} className='inline-flex gap-2 text-6xl'>
          <FaMedium />
          <AiOutlineMediumWorkmark />
        </Link>

        <div className='inline-flex gap-8 items-center'>
          <Link href={"/about"} className='hidden md:block hover:text-gray-300'>
            About
          </Link>
          <Link
            href={"/contact"}
            className='hidden md:block hover:text-gray-300'
          >
            Contact
          </Link>

          <Button
            variant={"outline"}
            className='rounded-3xl dark:text-gray-200'
          >
            Get Started
          </Button>
        </div>
      </nav>
      <Separator />
    </header>
  );
}

export default Header;
