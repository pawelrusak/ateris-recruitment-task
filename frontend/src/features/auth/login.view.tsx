import { useNavigate } from "react-router";

import { useAuth } from "@/features/auth/hooks/hooks.auth";
import type { AuthCredential } from "@/features/auth/types";

export const LoginView = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const formValues: AuthCredential = {
      login: String(formData.get("login") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    await auth.mutateAsync(formValues);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Login</label>
        <br />
        <input id="login" name="login" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input id="password" type="password" name="password" />
      </div>

      <button type="submit" disabled={auth.isPending}>
        {auth.isPending ? "Logging in..." : "Login"}
      </button>

      {auth.isError && <div>Login failed. Please try again.</div>}
    </form>
  );
};

export default LoginView;
