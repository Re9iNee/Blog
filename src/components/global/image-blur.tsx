import Image, { ImageProps } from "next/image";
import sharp from "sharp";
import { getPlaiceholder } from "plaiceholder";

async function generateBase64(src: string) {
  try {
    const buffer = await fetch(src)
      .then(async (res) => Buffer.from(await res.arrayBuffer()))
      .catch((e) => {
        console.error("fetching error", e);
      });

    const newBuffer = await sharp(buffer as any)
      .webp({ quality: 10 })
      .toBuffer();

    const { base64 } = await getPlaiceholder(newBuffer);

    return base64;
  } catch (e) {
    console.error("running", e);
  }
}

export default async function BlurImage({ src, alt, ...rest }: ImageProps) {
  if (typeof src !== "string") return <Image src={src} alt={alt} {...rest} />;

  const base64 = await generateBase64(src);

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
