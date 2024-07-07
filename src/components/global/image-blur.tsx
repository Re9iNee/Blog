import { generateBlurredBase64 } from "@/lib/utils/imageUtils";
import Image, { ImageProps } from "next/image";

export default async function BlurImage({ src, alt, ...rest }: ImageProps) {
  if (typeof src !== "string") return <Image src={src} alt={alt} {...rest} />;

  const base64 = await generateBlurredBase64(src);

  return (
    <Image
      alt={alt}
      src={src}
      placeholder='blur'
      blurDataURL={
        base64 ??
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      }
      {...rest}
    />
  );
}
