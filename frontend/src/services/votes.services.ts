import api from "./api.config";
import type { VoteStatus } from "@/helpers/hooks.votes";

export const votesService = {
  getBookVotes: async (bookId: string): Promise<VoteStatus> => {
    const { data } = await api.get(`/api/votes/${bookId}/`);

    return data;
  },

  toggleBookVote: async (bookId: string): Promise<VoteStatus> => {
    const { data } = await api.post(`/api/votes/${bookId}/toggle/`);

    return data;
  },
};
