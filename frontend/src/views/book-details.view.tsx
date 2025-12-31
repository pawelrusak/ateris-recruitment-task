import { useParams } from "react-router";
import { useBookDetails } from "@/helpers/hooks.books";

type BookDetailsParams = {
  owner: string;
  id: string;
};

const BookDetailsView = () => {
  const params = useParams<BookDetailsParams>();

  const {
    data: book,
    isLoading,
    isError,
  } = useBookDetails(params.id ?? "", params.owner ?? "");

  if (isLoading) {
    return <div>Loading book details...</div>;
  }

  if (isError) {
    return <div>Error loading book details.</div>;
  }

  if (!book) {
    return <div>No book details available.</div>;
  }

  return (
    <main>
      <header>
        <h1>Book Details</h1>
      </header>
      <section>
        <h2>{book.title}</h2>
        <p>
          <strong>Authors:</strong> {book.authors.join(", ")}
        </p>
        <p>
          <strong>Published At:</strong> {book.published_at}
        </p>
      </section>
    </main>
  );
};

export default BookDetailsView;
