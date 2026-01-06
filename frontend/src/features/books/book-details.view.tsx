import { useParams } from "react-router";
import { useBookDetails } from "@/features/books/hooks/hooks.books";
import {
  useBookVotes,
  useToggleBookVote,
} from "@/features/books/hooks/hooks.votes";

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

  const { data: vote } = useBookVotes(params.id ?? "");
  const toggle = useToggleBookVote(params.id ?? "");

  if (isLoading) {
    return <div>Loading book details...</div>;
  }

  if (isError) {
    return <div>Error loading book details.</div>;
  }

  if (!book) {
    return <div>No book details available.</div>;
  }

  const liked = vote?.liked ?? false;
  const votesCount = vote?.votes_count ?? 0;

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

        <p>
          <button disabled={toggle.isPending} onClick={() => toggle.mutate()}>
            {liked ? "Unlike" : "Like"}
          </button>
          <strong>Likes:</strong> {votesCount}
        </p>
      </section>
    </main>
  );
};

export default BookDetailsView;
