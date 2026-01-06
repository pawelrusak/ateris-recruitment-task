import type { ExternalBook } from "@/features/books/types";

type ExternalBookId = ExternalBook["id"];

type BookSearchResultProps = {
  author: string;
  books: ExternalBook[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onBookSelect: (bookId: ExternalBookId) => void;
};

const BooksSearchResult = ({
  books,
  isLoading,
  isError,
  author,
  onBookSelect,
}: BookSearchResultProps) => {
  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error fetching books for author: {author}</p>;

  const handleBookItemClick = (bookId: ExternalBookId) => {
    onBookSelect(bookId);
  };

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
                <button onClick={() => handleBookItemClick(book.id)}>
                  Add
                </button>
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
