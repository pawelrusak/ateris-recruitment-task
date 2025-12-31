import api from "./api.config";
import type { UserBook } from "@/types";

export const booksService = {
  fetchBooks: async (): Promise<UserBook[]> => {
    const { data } = await api.get("/api/books/");
    return data;
  },
};
