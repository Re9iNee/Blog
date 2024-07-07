import { SlideShow } from "@/components/ui/slide-show";
import { getMainImagePlaceholderUrl } from "@/lib/utils";
import { generateBlurredBase64 } from "@/lib/utils/imageUtils";
import { getSlideshowContents } from "@/service/posts.service";

export default async function SlideShowWrapper() {
  const slideshowPosts = await getSlideshowContents();
  if (slideshowPosts.length < 0 || !slideshowPosts) return <></>;

  return <SlideShow className='px-4 mt-14 mb-3' cards={slideshowPosts} />;
}
