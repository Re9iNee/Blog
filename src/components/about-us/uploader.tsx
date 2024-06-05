"use client";

import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

export default function Uploader() {
  // use state to store the file string
  const [fileString, setFileString] = useState<ArrayBuffer | null>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // get file from input
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    // show the file thumbnail in label
    const reader = new FileReader();
    reader.onload = (e) => {
      const label = e.target?.result;
      console.log(label);
      setFileString(label as ArrayBuffer);
    };
    reader.readAsDataURL(file);
  };

  return (
    <label
      htmlFor='upload'
      className='border-dashed border-2 rounded-2xl border-indigo-500 bg-indigo-100 w-32 h-44 flex items-center justify-center cursor-pointer hover:bg-indigo-200 transition-all duration-300 ease-in-out relative'
    >
      <span className='text-indigo-500 flex flex-col items-center justify-center w-full h-full'>
        <FiUploadCloud className='text-indigo-500' />
        Upload CV
      </span>
      <input
        id='upload'
        type='file'
        name='upload'
        onChange={onInputChange}
        className='opacity-0 absolute'
      />
    </label>
  );
}
