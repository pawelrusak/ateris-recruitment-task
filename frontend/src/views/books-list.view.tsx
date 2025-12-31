import { Link } from "react-router";

const BooksListView = () => {
  return (
    <main>
      Book List
      <ul>
        <li>
          Sample Book 1 - <Link to="/books/owner1">Details</Link>
        </li>
        <li>
          Sample Book 2 - <Link to="/books/owner2">Details</Link>
        </li>
      </ul>
    </main>
  );
};

export default BooksListView;
