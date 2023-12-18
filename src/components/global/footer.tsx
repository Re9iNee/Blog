import { FiInstagram, FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import EmailSignUpInput from "../homepage/email-signup-input";

const Footer = () => {
  return (
    <footer
      className='max-w-screen-xl px-4 py-6 flex flex-col gap-6 text-left  bg-neutral-100 rounded-t-largest footer-shadow-mobile dark:bg-neutral-950
      md:px-8 md:gap-8
      lg:px-16 lg:gap-10 lg:pt-12
      xl:mx-auto xl:px-20
      '
    >
      {/* Brand info */}
      <section
        className='text-left flex flex-col gap-4 sm:col-span-12
        lg:flex-row lg:justify-between lg:gap-24
        '
      >
        <section className='flex flex-col gap-2'>
          <h2
            className='gradient-logo font-anurati text-4xl font-black
            sm:text-5xl sm:drop-shadow-lg
            '
          >
            MORA
          </h2>
          <h4
            className='text-sm gradient-logo font-extralight tracking-widest 
            sm:text-xl sm:drop-shadow-lg
            '
          >
            Do More with Less Work
          </h4>
        </section>
        <section className='lg:w-96 lg:h-28'>
          <h3 className='font-bold text-neutral-800 text-base dark:text-neutral-200'>
            What is Mora?
          </h3>
          <p className='text-neutral-500 text-sm leading-tight dark:text-neutral-400'>
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
          <h3 className='text-neutral-800 font-bold text-lg dark:text-neutral-200'>
            Find us on
          </h3>
          {/* footer links */}
          <section className='flex gap-2'>
            <FiLinkedin className='text-sky-700 w-8 h-8 dark:text-sky-500' />
            <FiInstagram className='text-pink-600 w-8 h-8 dark:text-pink-400' />
            <FaXTwitter className='w-8 h-8 dark:text-neutral-50' />
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
            className='h-11 self-stretch  bg-purple-600 font-bold text-white text-sm px-10 py-3 rounded-2xl
            sm:hidden
            '
          >
            Sign-up
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
