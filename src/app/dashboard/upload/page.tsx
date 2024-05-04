import { Metadata } from "next";
import UploadInput from "./upload-input";
import UploadList from "./upload-list";

export const metadata: Metadata = {
  title: "Upload",
};

function UploadPage() {
  return (
    <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Upload Center!</h2>
          <p className='text-muted-foreground'>
            You can upload images, files etc.
          </p>
        </div>
      </div>

      <UploadInput />

      <UploadList />
    </div>
  );
}

export default UploadPage;
