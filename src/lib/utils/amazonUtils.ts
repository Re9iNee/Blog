export function getS3ObjectURLFromKey(key: string): string {
  const cdnUrl = process.env.S3_CLOUDFRONT_DOMAIN_URL;
  if (!cdnUrl) throw new Error("S3_CLOUDFRONT_DOMAIN_URL variable is not set");

  const url = new URL(`${cdnUrl}${key}`).toString();
  return url;
}

export function getS3ObjectKeyFromURL(url: string): string {
  const cdnUrl = process.env.S3_CLOUDFRONT_DOMAIN_URL;
  if (!cdnUrl) throw new Error("S3_CLOUDFRONT_DOMAIN_URL variable is not set");

  const key = url.replace(cdnUrl, "");
  return key;
}

export function getFilenamesFromAmazonS3Url(url: string): string {
  // gives the file name from the url
  // input: https://d1ntfq67otjmwh.cloudfront.net/mora-blog-files/1709133016570-Social%20Proofing%20-%20Section%201%20-%20Beneath%20the%20Surface.webp
  // output: Social Proofing - Section 1 - Beneath the Surface.webp
  const regexp = /https:\/\/.+\/\d+\-(.+)/g;
  const matchedArray = [...url.matchAll(regexp)];

  const decodedName = decodeURI(matchedArray[0][1]);
  return decodedName;
}
