import { BrowserRouter, Routes, Route } from "react-router";

import BookDetailsView from "@/views/book-details.view";
import BooksListView from "@/views/books-list.view";
import ExternalBooksView from "@/views/external-books.view";
import LoginView from "@/views/login.view";
import PrivateLayout from "@/layout/private.layout";

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<ExternalBooksView />} />
          <Route path="/books" element={<BooksListView />} />
          <Route path="/books/:owner" element={<BookDetailsView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
