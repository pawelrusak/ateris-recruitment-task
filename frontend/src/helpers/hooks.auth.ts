import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authService } from "../services/auth.services";

export function useAuth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.loginRequest,
    onSuccess: (tokens) => {
      authService.saveTokens(tokens);

      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    authService.clearTokens();
    queryClient.clear();
    navigate("/login");
  };
}
