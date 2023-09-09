export const bookSearchableFields = ["title", "author", "genre", "category"];

export const bookFilterableFields = [
  "page",
  "size",
  "sortBy",
  "sortOrder",
  "minPrice",
  "maxPrice",
  "category",
];

export type IBookFilterRequest = {
  searchTerm?: string;
  search?: string;
  category?: string;
};
