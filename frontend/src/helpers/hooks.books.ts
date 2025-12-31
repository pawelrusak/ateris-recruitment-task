import { useQuery } from "@tanstack/react-query";
import { booksService } from "../services/books.services";
import { ACCESS_TOKEN } from "@/services/api.config";

type Owner = string | null;

export const useBooks = (owner: Owner) => {
  const hasAccess = Boolean(localStorage.getItem(ACCESS_TOKEN));

  return useQuery({
    queryKey: ["books", owner],
    queryFn: () => booksService.fetchBooks(owner),
    enabled: hasAccess,
  });
};

export const useExternalBooks = (author: string | null) => {
  const hasAccess = Boolean(localStorage.getItem(ACCESS_TOKEN));
  const authorValue = (author ?? "").trim();

  return useQuery({
    queryKey: ["externalBooks", authorValue],
    queryFn: () => booksService.fetchBookByAuthor(authorValue),
    enabled: hasAccess && authorValue.length > 0,
  });
};
