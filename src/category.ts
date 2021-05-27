export interface CategoryNode {
  id: string;
  title: string;
  description?: string;
  content: string;
  comments: string[];
}

export interface Category {
  id: string;
  title: string;
  subcategories: (Category | CategoryNode)[];
}

export const empty: Category = {
  id: "000",
  title: "...",
  subcategories: []
};

export function isNode(node: Category | CategoryNode): node is CategoryNode {
  return !(node as Category).subcategories;
}
