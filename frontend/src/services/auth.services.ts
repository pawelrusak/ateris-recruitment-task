import api, { ACCESS_TOKEN, REFRESH_TOKEN } from "./api.config";

import type { AuthCredential, Tokens } from "@/types";

export const authService = {
  loginRequest: async (credentials: AuthCredential) => {
    const { data } = await api.post("/api/users/token/", credentials);
    return data as { access: string; refresh: string };
  },

  saveTokens: (tokens: Tokens) => {
    localStorage.setItem(ACCESS_TOKEN, tokens.access);
    localStorage.setItem(REFRESH_TOKEN, tokens.refresh);
  },

  clearTokens: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  },
};
