import { Link } from "react-router";

import { useBooks } from "@/helpers/hooks.books";

const BooksListView = () => {
  const { data, isLoading, isError, error } = useBooks();

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return <div>Error {JSON.stringify(error)}</div>;
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

              <Link to={`/books/${book.owner.login}`}>Details</Link>
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
