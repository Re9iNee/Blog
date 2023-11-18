import Link from "next/link";
import { AiOutlineMediumWorkmark } from "react-icons/ai";
import { FaMedium } from "react-icons/fa6";
import { Separator } from "../ui/separator";

function Footer() {
  return (
    <div className='flex flex-col p-4'>
      <section className='inline-flex gap-2 cursor-pointer text-6xl'>
        <FaMedium />
        <AiOutlineMediumWorkmark />
      </section>

      <nav className='flex gap-4'>
        <Link href='/about'>About</Link>
        <Link href='/help'>Help</Link>
        <Link href='/Terms'>Terms</Link>
        <Link href='/Policy'>Policy</Link>
      </nav>
    </div>
  );
}

export default Footer;
