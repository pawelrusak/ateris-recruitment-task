import { NavLink, Outlet } from "react-router";

const PrivateLayout = () => {
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
            <button>Logout</button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
