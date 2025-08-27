export interface Recipe {
  id: number;
  label: string;
  href: string;
  img: string;
  alt: string;
  is_pinned: boolean;
  category: string;
  category_id: number;
}
export interface RecipeParsed {
  images: [
    {
      Img: string;
      Alt: string;
    },
  ];
  label: string[];
  href: string;
}
export interface Category {
  id: number;
  category: string;
}
