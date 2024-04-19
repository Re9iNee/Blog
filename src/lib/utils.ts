import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAvatarPlaceholderUrl(): string {
  return "https://api.dicebear.com/7.x/pixel-art/svg";
}

export function getMainImagePlaceholderUrl(): string {
  return "https://placehold.co/192x128";
}

/* format date to show: Nov 16 */
export function convertDateToMonthAndDay(date: Date | null): string {
  if (!date) return "Unknown";

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
export function convertDateToDayMonthAndYear(date: Date | null): string {
  if (!date) return "Unknown";

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    // if its the same year, don't show the year
    year:
      date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
  });
}

export function isDateInCurrentMonth(inputDate: Date | null): boolean {
  if (!inputDate) return false;

  const currentDate = new Date();

  const inputMonth = inputDate.getMonth(); // getMonth() returns 0-11 for Jan-Dec
  const inputYear = inputDate.getFullYear();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return inputYear === currentYear && inputMonth === currentMonth;
}

export const createNameAbv = (name: string) => {
  const nameArr = name.split(" ");

  return nameArr
    .map((name) => name[0])
    .slice(0, 2)
    .join("");
};

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

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const copyTextToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export function paginate<T>(
  array: T[],
  page_size: number,
  page_number: number
): T[] {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
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
