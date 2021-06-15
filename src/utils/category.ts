export interface CategoryLeaf {
  id: string;
  title: string;
  description?: string;
  content: string;
  comments: string[];
}

export interface Category {
  id: string;
  title: string;
  subcategories: (Category | CategoryLeaf)[];
}

export const empty: Category = {
  id: "000",
  title: "...",
  subcategories: [],
};

export const isEmpty = (cat: Category) => {
  return cat === empty || (cat.id === empty.id && cat.title === empty.title);
};

export function isLeaf(node: Category | CategoryLeaf): node is CategoryLeaf {
  return !(node as Category).subcategories;
}

const notFalsy = <T>(x: T) => !!x;

export const getProducts = (cat: CategoryLeaf) => {
  if (!cat.content) return [];
  return cat.content.split("；").filter(notFalsy);
};
