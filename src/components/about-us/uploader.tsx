import { FiUploadCloud } from "react-icons/fi";

export default function Uploader() {
  return (
    <div className='border-dashed border-2 rounded-2xl border-indigo-500 bg-indigo-100 w-32 h-44 flex items-center justify-center'>
      <label htmlFor='' className='text-indigo-500 flex flex-col items-center'>
        <FiUploadCloud className='text-indigo-500' />
        Upload CV
      </label>
    </div>
  );
}
