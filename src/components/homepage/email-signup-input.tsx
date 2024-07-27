import React, { ComponentProps } from "react";

const EmailSignUpInput = ({ maxLength }: ComponentProps<"input">) => {
  return (
    <div className="relative hidden rounded-3xl shadow-sm sm:block">
      <input
        type="email"
        maxLength={maxLength}
        name="subscribe-email"
        className="block w-full rounded-3xl border border-slate-200 bg-neutral-50 p-4 pr-48 text-sm text-gray-900 shadow-2xl shadow-slate-200 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-800 dark:bg-background dark:text-white dark:placeholder-neutral-600 dark:shadow-none dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm sm:leading-6"
        placeholder="example@gmail.com"
      />
      <div className="absolute inset-y-0 right-2 flex items-center">
        <button className="custom-gradient rounded-3xl px-4 py-3 text-sm font-semibold text-white">
          Join Community
        </button>
      </div>
    </div>
  );
};

export default EmailSignUpInput;
