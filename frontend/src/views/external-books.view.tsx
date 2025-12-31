import { useState } from "react";
import { useExternalBooks } from "@/helpers/hooks.books";
import BooksSearchResult from "@/components/book-search-result.component";

const ExternalBooksView = () => {
  const [author, setAuthor] = useState("");
  const {
    data: books,
    isLoading,
    isError,
  } = useExternalBooks(author.trim() ? author : null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const authorName = String(formData.get("author")?.toString().trim() ?? "");

    setAuthor(authorName);
  };

  return (
    <main>
      <header>
        <h1>Author Books</h1>
        <search>
          <form onSubmit={handleSubmit}>
            <label htmlFor="author">
              <strong>Find Books by Author</strong>
            </label>
            <br />
            <input type="search" id="author" name="author" />
            <button type="submit">Search</button>
          </form>
        </search>
      </header>
      <hr />
      <section>
        <BooksSearchResult
          books={books}
          isLoading={isLoading}
          isError={isError}
          author={author}
        />
      </section>
    </main>
  );
};

export default ExternalBooksView;
