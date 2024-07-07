import sharp from "sharp";
import { getPlaiceholder } from "plaiceholder";

export async function generateBlurredBase64(src: string) {
  try {
    const buffer = await fetch(src)
      .then(async (res) => Buffer.from(await res.arrayBuffer()))
      .catch((e) => {
        console.error("fetching error", e);
      });

    const newBuffer = await sharp(buffer as any)
      .jpeg({ quality: 1 })
      .toBuffer();

    const { base64 } = await getPlaiceholder(newBuffer);

    return base64;
  } catch (e) {
    console.error("running", e);
  }
}
