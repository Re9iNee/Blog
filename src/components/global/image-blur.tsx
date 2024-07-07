import Image, { ImageProps } from "next/image";
import { getPlaiceholder } from "plaiceholder";

async function generateBase64(src: string) {
  try {
    const buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );
    const { base64 } = await getPlaiceholder(buffer);

    return base64;
  } catch (e) {
    console.error(e);
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
      blurDataURL={base64}
      {...rest}
    />
  );
}
