import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
