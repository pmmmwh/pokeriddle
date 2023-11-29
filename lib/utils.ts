import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type FalsyValues = false | null | undefined | "" | 0;

export function typedBoolean<ValueType>(
  value: ValueType,
): value is Exclude<ValueType, FalsyValues> {
  return Boolean(value);
}
