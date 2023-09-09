export const bookSearchableFields = ["title", "author", "genre", "categoryId"];

export const bookFilterableFields = [
  "search",
  "title",
  "author",
  "genre",
  "categoryId",
];

export type IBookFilterRequest = {
  search?: string;
  title?: string;
  author?: string;
  genre?: string;
  category?: string;
};
