import { SlideShow } from "@/components/ui/slide-show";
import { getSlideshowContents } from "@/service/posts.service";

export default async function SlideShowWrapper() {
  const slideshowPosts = await getSlideshowContents();
  if (slideshowPosts.length < 0 || !slideshowPosts) return <></>;

  return <SlideShow className="mb-3 mt-14 px-4" cards={slideshowPosts} />;
}
