import { useQuery } from "@tanstack/react-query";
import { booksService } from "../services/books.services";
import { ACCESS_TOKEN } from "@/services/api.config";

type Owner = string | null;

export function useBooks(owner: Owner) {
  const hasAccess = Boolean(localStorage.getItem(ACCESS_TOKEN));

  return useQuery({
    queryKey: ["books", owner],
    queryFn: () => booksService.fetchBooks(owner),
    enabled: hasAccess,
  });
}
