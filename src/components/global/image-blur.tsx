import Image, { ImageProps } from "next/image";
import image1 from "public/images/post-placeholder-images/172.webp";
import image2 from "public/images/post-placeholder-images/204.webp";
import image3 from "public/images/post-placeholder-images/221.webp";
import image4 from "public/images/post-placeholder-images/241.webp";
import image5 from "public/images/post-placeholder-images/255.webp";
import image6 from "public/images/post-placeholder-images/286.webp";
import image7 from "public/images/post-placeholder-images/378.webp";
import image8 from "public/images/post-placeholder-images/468.webp";
import image9 from "public/images/post-placeholder-images/470.webp";
import image10 from "public/images/post-placeholder-images/487.webp";

export default async function BlurImage({ src, alt, ...rest }: ImageProps) {
  if (typeof src !== "string") return <Image src={src} alt={alt} {...rest} />;

  const imagesPlaceholderdata = [
    image1.blurDataURL,
    image2.blurDataURL,
    image3.blurDataURL,
    image4.blurDataURL,
    image5.blurDataURL,
    image6.blurDataURL,
    image7.blurDataURL,
    image8.blurDataURL,
    image9.blurDataURL,
    image10.blurDataURL,
  ];

  return (
    <Image
      alt={alt}
      src={src}
      placeholder="blur"
      blurDataURL={
        imagesPlaceholderdata[
          Math.floor(Math.random() * imagesPlaceholderdata.length)
        ]
      }
      {...rest}
    />
  );
}
