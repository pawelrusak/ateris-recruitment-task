import { NavLink, Outlet } from "react-router";
import { useLogout } from "@/features/auth/hooks/hooks.auth";

const PrivateLayout = () => {
  const logout = useLogout();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">External Books</NavLink>
          </li>
          <li>
            <NavLink to="/books">My Books</NavLink>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
