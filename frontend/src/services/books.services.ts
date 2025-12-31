import api from "./api.config";
import type { UserBook, ExternalBook } from "@/types";

type ExternalBooksResponse = {
  books: ExternalBook[];
};

export const booksService = {
  fetchBooks: async (owner: string | null) => {
    const ownerValue = (owner ?? "").trim();
    console.log("Fetching books for owner:", ownerValue);

    const { data } = await api.get<UserBook[]>("/api/books/", {
      params: ownerValue ? { owner: ownerValue } : undefined,
    });

    return data;
  },

  fetchBookByAuthor: async (author: string): Promise<ExternalBook[]> => {
    const authorValue = author.trim();

    if (!authorValue) {
      return [];
    }

    const { data } = await api.get<ExternalBooksResponse>(
      "/api/external-books/",
      {
        params: { author: authorValue },
      }
    );

    return data.books;
  },

  fetchBookByIdAndOwner: async (id: string, owner: string) => {
    const bookId = id.trim();
    const ownerValue = owner.trim();

    const { data } = await api.get<UserBook>(`/api/books/${bookId}/`, {
      params: { owner: ownerValue },
    });

    return data;
  },

  createBookByGoogleVolumeId: async (google_volume_id: string) => {
    const googleVolumeId = google_volume_id.trim();

    const { data } = await api.post<UserBook>("/api/books/", {
      google_volume_id: googleVolumeId,
    });

    return data;
  },
};
