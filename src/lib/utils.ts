import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import moment from "moment";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 8);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export async function fetcher<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json() as Promise<JSON>;
}

export const dateFormat = (
  date: Date | string | number,
  format: string = "DD MMM YYYY"
): string => {
  return moment(date).format(format);
};
