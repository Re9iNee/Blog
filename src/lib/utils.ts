import { type ClassValue, clsx } from "clsx";
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

export function isDateInCurrentMonth(inputDate: Date | null): boolean {
  if (!inputDate) return false;

  const currentDate = new Date();

  const inputMonth = inputDate.getMonth(); // getMonth() returns 0-11 for Jan-Dec
  const inputYear = inputDate.getFullYear();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return inputYear === currentYear && inputMonth === currentMonth;
}
