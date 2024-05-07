import GoBackButton from "@/components/global/GoBackButton";
import { Button } from "@/components/ui/button";
import { notoSans, outfit } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      role='alert'
      aria-label='404 Not Found'
      className='flex flex-col items-center justify-center min-h-screen p-4
      lg:flex-row lg:gap-8
      '
    >
      <div className='flex items-center'>
        <FourIcon />
        <Image
          width={230}
          height={230}
          alt='planet icon'
          placeholder='blur'
          aria-hidden='true'
          src='/404/Planet.gif'
          blurDataURL='/404/Planet.svg'
        />
        <FourIcon />
      </div>
      <div
        className='flex flex-col justify-center
        lg:max-w-96 lg:items-start
        '
      >
        <section
          aria-label='info'
          className='flex flex-col text-center gap-4 mb-14
          md:gap-6
          lg:text-left lg:mb-14
          '
        >
          <h1
            className='font-bold text-purple-600 text-xl font-poppins
            sm:text-2xl
            md:text-4xl
            '
          >
            Oops, We didn&apos;t find the page
          </h1>
          <h3
            className={cn(
              "text-gray-500 text-sm",
              outfit.className,
              "md:text-lg"
            )}
          >
            Check if you have typed the correct link or the link isn&apos;t
            expired.
          </h3>
        </section>
        <section
          aria-label='actions'
          className='flex flex-col gap-4 justify-center
          sm:flex-row
          '
        >
          <GoBackButton
            className={cn(
              "rounded-2xl bg-gray-100 font-bold border-none",
              notoSans.className
            )}
          >
            Go Back
          </GoBackButton>
          <Button
            asChild
            variant={"outline"}
            className={cn(
              "rounded-2xl bg-gray-100 font-bold border-none",
              notoSans.className
            )}
          >
            <Link href='/'>Return Home</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
function FourIcon() {
  return (
    <svg
      fill='none'
      viewBox='0 0 63 82'
      className='w-16 h-20
      md:w-20 md:h-28
      '
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.5 65.4845L10.5463 4.61972H25.9889L15.8278 65.4845H0.5ZM0.5 65.4845L9.51296 51.5676H40.6852V65.4845H0.5ZM53.487 65.4845V51.5676H62.5V65.4845H53.487ZM39.537 82V0H54.6352V82H39.537Z'
        fill='#BF7BFB'
      />
    </svg>
  );
}
