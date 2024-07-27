import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
  page_number: number,
): T[] {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export const createNameAbv = (name: string) => {
  const nameArr = name.split(" ");

  return nameArr
    .map((name) => name[0])
    .slice(0, 2)
    .join("");
};

export function getAvatarPlaceholderUrl(): string {
  return "https://api.dicebear.com/7.x/pixel-art/svg";
}

export function getMainImagePlaceholderUrl(): string {
  return "https://placehold.co/192x128";
}

export function makeSlugWithTitle(
  title: string | undefined,
): string | undefined {
  const slug = title
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "");
  return slug;
}

export function isLoggedIn(
  status: "loading" | "authenticated" | "unauthenticated",
) {
  return status === "authenticated";
}
