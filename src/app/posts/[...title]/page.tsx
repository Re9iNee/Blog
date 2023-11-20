import { Separator } from "@/components/ui/separator";
import author from "@/mocks/author.json";
import { RxDotFilled } from "react-icons/rx";

const data = {
  title: "It`s the End of Feminist Media. Again.",
  summery:
    "Jezebel’s closing isn’t the end of an era — it’s a reminder that the era has been over for a long time.",
  author: author,
  reading_time: 8,
  published_at: "3 days ago",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus in metus vulputate eu. Non blandit massa enim nec dui nunc mattis enim. Ornare massa eget egestas purus. Quis auctor elit sed vulputate mi sit amet. Velit ut tortor pretium viverra suspendisse potenti. Dolor sit amet consectetur adipiscing elit. Mus mauris vitae ultricies leo integer malesuada nunc vel. Est ante in nibh mauris cursus mattis. Eget nunc scelerisque viverra mauris in. Et netus et malesuada fames ac turpis egestas sed tempus. Leo duis ut diam quam nulla porttitor. Elit duis tristique sollicitudin nibh sit amet commodo. Tortor condimentum lacinia quis vel eros donec ac odio. Ut aliquam purus sit amet luctus venenatis lectus. Non odio euismod lacinia at quis. Auctor urna nunc id cursus metus aliquam. Cursus in hac habitasse platea. Mattis aliquam faucibus purus in massa tempor. Ultrices eros in cursus turpis massa tincidunt dui ut. In fermentum et sollicitudin ac orci phasellus. Quis enim lobortis scelerisque fermentum dui. Imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Sed felis eget velit aliquet sagittis id. Tincidunt eget nullam non nisi est sit amet. Gravida neque convallis a cras semper auctor. Nullam eget felis eget nunc lobortis mattis aliquam. Laoreet id donec ultrices tincidunt arcu non sodales neque sodales. Sit amet porttitor eget dolor morbi. At volutpat diam ut venenatis tellus.",
};

function PostPage() {
  return (
    <div className='pt-8 flex flex-col gap-4 px-4 mb-8 max-w-screen-md mx-auto'>
      <h1 className='text-3xl font-extrabold leading-9'>{data.title}</h1>
      <h3 className='text-lg leading-6 text-neutral-500'>{data.summery}</h3>

      <section className='flex gap-1 items-center text-neutral-500 text-sm'>
        <time>{data.published_at}</time>
        <RxDotFilled />
        <span>{data.reading_time} min read</span>
      </section>

      <Separator />

      <article>
        <p>{data.body}</p>
      </article>
    </div>
  );
}

export default PostPage;
