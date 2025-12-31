import api from "./api.config";
import type { UserBook } from "@/types";

type Owner = string | null;

export const booksService = {
  fetchBooks: async (owner: Owner): Promise<UserBook[]> => {
    const ownerValue = (owner ?? "").trim();
    console.log("Fetching books for owner:", ownerValue);

    const { data } = await api.get<UserBook[]>("/api/books/", {
      params: ownerValue ? { owner: ownerValue } : undefined,
    });

    return data;
  },
};
