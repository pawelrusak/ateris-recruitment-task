import { useQuery } from "@tanstack/react-query";
import { booksService } from "../services/books.services";
import { ACCESS_TOKEN } from "@/services/api.config";

export function useBooks() {
  const hasAccess = Boolean(localStorage.getItem(ACCESS_TOKEN));

  return useQuery({
    queryKey: ["books"],
    queryFn: booksService.fetchBooks,
    enabled: hasAccess,
  });
}
