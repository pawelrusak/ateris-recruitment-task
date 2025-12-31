import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ACCESS_TOKEN } from "@/services/api.config";
import { votesService } from "@/services/votes.services";

export type VoteStatus = {
  liked: boolean;
  votes_count: number;
};

export const useBookVotes = (bookId: string) => {
  const hasAccess = Boolean(localStorage.getItem(ACCESS_TOKEN));
  const bookIdValue = (bookId ?? "").trim();

  return useQuery({
    queryKey: ["bookVotes", bookIdValue],
    queryFn: () => votesService.getBookVotes(bookIdValue),
    enabled: hasAccess && bookIdValue.length > 0,
  });
};

export const useToggleBookVote = (bookId: string) => {
  const queryClient = useQueryClient();
  const bookIdValue = (bookId ?? "").trim();

  return useMutation({
    mutationKey: ["toggleBookVote", bookIdValue],
    mutationFn: () => votesService.toggleBookVote(bookIdValue),
    onSuccess: (data) => {
      queryClient.setQueryData(["bookVotes", bookIdValue], data);
      toast.success(data.liked ? "Liked" : "Unliked");
    },
    onError: () => {
      toast.error("Failed to update vote. Please try again.");
    },
  });
};
