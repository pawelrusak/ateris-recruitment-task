import { Link } from "react-router";
import { useParams } from "react-router";

import { useBooks } from "@/helpers/hooks.books";

const BooksListView = () => {
  const params = useParams<{ owner?: string }>();
  console.log(params);

  const { data, isLoading, isError, error } = useBooks(params.owner || null);

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    // eslint-disable-next-line
    // @ts-ignore
    const hasNotFound = error.status === 404;

    const message = hasNotFound
      ? "404 Not Found"
      : `Error ${JSON.stringify(error)}}`;

    return <main>{message}</main>;
  }

  const books = data || [];

  return (
    <main>
      <header>
        <h2>Book List</h2>
      </header>
      <ul>
        {books.length ? (
          books.map((book) => (
            <li key={book.id}>
              <header>
                <h2>{book.title}</h2>
              </header>

              <p>
                Author(s): {book.authors.map((author) => author).join(", ")}
              </p>
              <p>Published at: {book.published_at}</p>

              <Link to={`/books/${book.owner.login}/${book.id}`}>Details</Link>
              <hr />
            </li>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </ul>
    </main>
  );
};

export default BooksListView;
