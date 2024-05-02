import { SlideShow } from "@/components/ui/slide-show";
import { getSlideshowContents } from "@/service/posts.service";

export const revalidate = 60;
export default async function SlideShowWrapper() {
  const slideshowPosts = await getSlideshowContents();

  return (
    <>
      {slideshowPosts.length > 0 && (
        <SlideShow className='px-4 mt-14 mb-3' cards={slideshowPosts} />
      )}
    </>
  );
}
