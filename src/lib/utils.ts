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

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const copyTextToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
