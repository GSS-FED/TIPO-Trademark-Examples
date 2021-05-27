import { Category } from "./category";

export function categories(): Promise<Category[]> {
  return fetch("/data/categories.json").then((res) => res.json());
}
