import type { ExternalBook } from "@/types";

type BookSearchResultProps = {
  author: string;
  books: ExternalBook[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const BooksSearchResult = ({
  books,
  isLoading,
  isError,
  author,
}: BookSearchResultProps) => {
  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error fetching books for author: {author}</p>;

  return (
    <section>
      {books ? (
        books.length ? (
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <header>
                  <h2>{book.title}</h2>
                </header>
                <p>Author(s): {book.authors.join(", ")}</p>
                <hr />
              </li>
            ))}
            <hr />
          </ul>
        ) : (
          <p>No books found for author: {author}</p>
        )
      ) : (
        <p>
          Please enter an author name and submit the form to search for books.
        </p>
      )}
    </section>
  );
};

export default BooksSearchResult;
