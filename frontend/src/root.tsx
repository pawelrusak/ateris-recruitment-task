import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import BookDetailsView from "@/views/book-details.view";
import BooksListView from "@/views/books-list.view";
import ExternalBooksView from "@/views/external-books.view";
import LoginView from "@/views/login.view";
import PrivateLayout from "@/layout/private.layout";
import ProtectedRoute from "@/helpers/protected-router.component";
import PublicRoute from "@/helpers/public-router.component";

const queryClient = new QueryClient();

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginView />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<PrivateLayout />}>
              <Route path="/" element={<ExternalBooksView />} />
              <Route path="/books" element={<BooksListView />} />
              <Route path="/books/:owner" element={<BooksListView />} />
              <Route path="/books/:owner/:id" element={<BookDetailsView />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Root;
