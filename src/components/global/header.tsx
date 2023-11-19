import { FaMedium } from "react-icons/fa6";
import { AiOutlineMediumWorkmark } from "react-icons/ai";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

function Header() {
  return (
    <div className='bg-amber-400' id='header'>
      <header className='flex justify-between p-4 items-center'>
        <section className='inline-flex gap-2 cursor-pointer text-6xl text-black'>
          <FaMedium />
          <AiOutlineMediumWorkmark />
        </section>

        <Button variant={"outline"} className='rounded-3xl'>
          Get Started
        </Button>
      </header>
      <Separator />
    </div>
  );
}

export default Header;
