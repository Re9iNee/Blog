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
      htmlFor="upload"
      className="relative flex h-44 w-32 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-indigo-500 bg-indigo-100 transition-all duration-300 ease-in-out hover:bg-indigo-200"
    >
      <span className="flex h-full w-full flex-col items-center justify-center text-indigo-500">
        <FiUploadCloud className="text-indigo-500" />
        Upload CV
      </span>
      <input
        id="upload"
        type="file"
        name="upload"
        onChange={onInputChange}
        className="absolute opacity-0"
      />
    </label>
  );
}
