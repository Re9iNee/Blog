import Image from "next/image";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FiLinkedin } from "react-icons/fi";
import EmailSignUpInput from "../homepage/email-signup-input";
import FullLogo from "/public/logos/full-logo.svg";

const Footer = () => {
  return (
    <footer className="footer-shadow-mobile flex max-w-screen-xl flex-col gap-6 rounded-tl-3xl rounded-tr-3xl bg-neutral-100 px-4 py-6 text-left dark:bg-neutral-900 md:gap-8 md:px-8 lg:gap-10 lg:px-16 lg:pt-12 xl:px-20">
      {/* Brand info */}
      <section className="flex flex-col gap-4 text-left sm:col-span-12 lg:flex-row lg:justify-between lg:gap-24">
        <FullLogo />

        <section className="flex flex-col gap-2 lg:h-28 lg:w-96">
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-300">
            What is Mora?
          </h3>
          <p className="text-sm leading-5 text-neutral-600 dark:text-neutral-400 sm:max-w-xs">
            Mora is a series of products designed to improve the educational
            experience for schools, institutes, instructors, parents, and
            students.
          </p>
        </section>
      </section>

      <section className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-24">
        <section className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-300">
            Find us on
          </h3>
          {/* footer links */}
          <section className="flex gap-4">
            <Link
              target="_blank"
              prefetch={false}
              aria-label="Nuwa's LinkedIn page"
              href="https://www.linkedin.com/company/nuwa-holding/"
            >
              <FiLinkedin className="h-8 w-8 cursor-pointer text-sky-700 dark:text-sky-500" />
            </Link>

            {/* <FiInstagram className='text-pink-600 w-8 h-8 dark:text-pink-400 cursor-pointer' /> */}
            <Link
              target="_blank"
              prefetch={false}
              aria-label="Nuwa's Twitter page"
              href={"https://twitter.com/nuwa_company"}
            >
              <FaXTwitter className="h-8 w-8 cursor-pointer dark:text-neutral-50" />
            </Link>
          </section>
        </section>

        <section className="flex flex-col gap-3 lg:h-28 lg:w-96">
          <h3 className="font-bold text-neutral-800 dark:text-neutral-200">
            Subscribe to get updates
          </h3>
          <button className="h-11 self-stretch rounded-2xl bg-gradient-to-l from-violet-500 to-violet-700 px-10 py-3 text-sm font-bold text-white sm:hidden">
            Join Community
          </button>
          <EmailSignUpInput />
        </section>
      </section>

      <p className="text-center text-sm font-normal leading-tight text-neutral-600 dark:text-neutral-400">
        ©️Copyright. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
