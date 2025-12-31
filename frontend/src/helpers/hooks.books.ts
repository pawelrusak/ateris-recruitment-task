import { useQuery, useMutation } from "@tanstack/react-query";
import { booksService } from "../services/books.services";
import { ACCESS_TOKEN } from "@/services/api.config";
import toast from "react-hot-toast";

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

export const useCreateExternalBook = () => {
  return useMutation({
    mutationKey: ["addBook"],
    mutationFn: (google_volume_id: string) =>
      booksService.createBookByGoogleVolumeId(google_volume_id),
    onSuccess: () => {
      toast.success("Book added successfully!");
    },
    onError: () => {
      toast.error("Failed to add the book. Please try again.");
    },
  });
};
