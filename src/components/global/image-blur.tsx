import Image, { ImageProps } from "next/image";
import { getPlaiceholder } from "plaiceholder";
import PlaceholderPhoto from "public/images/placeholder.png";

async function fetchImage(src: string) {
  try {
    const res = await fetch(src, { signal: AbortSignal.timeout(1) });
    const arrayBuffer = await res.arrayBuffer();
    const buffer = await Buffer.from(arrayBuffer);

    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch (e) {
    console.error("Image fetch took too long", e);
  }
}

export default async function BlurImage({ src, alt, ...rest }: ImageProps) {
  if (typeof src !== "string") return <Image src={src} alt={alt} {...rest} />;

  const base64 = await fetchImage(src);

  return (
    <Image
      alt={alt}
      placeholder='blur'
      src={src ?? PlaceholderPhoto}
      blurDataURL={base64 ?? PlaceholderPhoto.blurDataURL}
      {...rest}
    />
  );
}
