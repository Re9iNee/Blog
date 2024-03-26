import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FiLinkedin } from "react-icons/fi";
import EmailSignUpInput from "../homepage/email-signup-input";
import FullLogo from "/public/logos/full-logo.svg";

const Footer = () => {
  return (
    <footer
      className='max-w-screen-xl px-4 py-6 flex flex-col gap-6 text-left  bg-neutral-100 rounded-tr-3xl rounded-tl-3xl footer-shadow-mobile dark:bg-neutral-900
      md:px-8 md:gap-8
      lg:px-16 lg:gap-10 lg:pt-12
      xl:px-20
      '
    >
      {/* Brand info */}
      <section
        className='text-left flex flex-col gap-4 sm:col-span-12
        lg:flex-row lg:justify-between lg:gap-24
        '
      >
        <FullLogo />

        <section className='flex flex-col gap-2 lg:w-96 lg:h-28'>
          <h3 className='font-bold text-neutral-800 text-base dark:text-neutral-300'>
            What is Mora?
          </h3>
          <p className='text-neutral-500 text-sm leading-5 sm:max-w-xs dark:text-neutral-400'>
            Mora is a library of AI tools and courses on how to use them to
            their fullest and like a master. Our mission is to help you take the
            most out of upcoming AI tools.
          </p>
        </section>
      </section>

      <section
        className='flex flex-col gap-4 
        md:flex-row md:justify-between md:gap-24'
      >
        <section className='flex flex-col gap-2'>
          <h3 className='text-neutral-800 font-bold text-lg dark:text-neutral-300'>
            Find us on
          </h3>
          {/* footer links */}
          <section className='flex gap-4'>
            <Link
              target='_blank'
              prefetch={false}
              href='https://www.linkedin.com/company/nuwa-holding/'
            >
              <FiLinkedin className='text-sky-700 w-8 h-8 dark:text-sky-500 cursor-pointer' />
            </Link>
            <Link
              target='_blank'
              prefetch={false}
              className='w-8 h-8 relative'
              href={"https://sites.google.com/view/nuwa-company/home"}
            >
              <Image fill src={"/favicon.svg"} alt='Nuwa website' />
            </Link>

            {/* <FiInstagram className='text-pink-600 w-8 h-8 dark:text-pink-400 cursor-pointer' /> */}
            <Link
              target='_blank'
              prefetch={false}
              href={"https://twitter.com/nuwa_company"}
            >
              <FaXTwitter className='w-8 h-8 dark:text-neutral-50 cursor-pointer' />
            </Link>
          </section>
        </section>

        <section
          className='flex flex-col gap-3 
          lg:w-96 lg:h-28
          '
        >
          <h3 className='text-neutral-800 font-bold dark:text-neutral-200'>
            Subscribe to get updates
          </h3>
          <button
            className='h-11 self-stretch font-bold text-white text-sm px-10 py-3 rounded-2xl bg-gradient-to-l from-violet-500 to-violet-700
            sm:hidden
            '
          >
            Join Community
          </button>
          <EmailSignUpInput />
        </section>
      </section>

      <p className='text-center text-neutral-500 text-sm font-normal leading-tight dark:text-neutral-400'>
        ©️Copyright. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
