import React, { ComponentProps } from "react";

const EmailSignUpInput = ({ maxLength }: ComponentProps<"input">) => {
  return (
    <div
      className='hidden relative rounded-3xl shadow-sm
            sm:block
            '
    >
      <input
        type='email'
        maxLength={maxLength}
        name='subscribe-email'
        className='block w-full text-sm p-4 pr-48 shadow-2xl shadow-slate-200 border border-slate-200 text-gray-900 rounded-3xl bg-neutral-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-none outline-none 
                sm:text-sm sm:leading-6'
        placeholder='example@gmail.com'
      />
      <div className='absolute inset-y-0 right-2 flex items-center'>
        <button className='custom-gradient text-white text-sm font-semibold px-4 py-3 rounded-3xl'>
          Sign-up for Updates
        </button>
      </div>
    </div>
  );
};

export default EmailSignUpInput;
