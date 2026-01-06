import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import BookDetailsView from "@/features/books/book-details.view";
import BooksListView from "@/features/books/books-list.view";
import ExternalBooksView from "@/features/books/external-books.view";
import LoginView from "@/features/auth/login.view";
import PrivateLayout from "@/shared/layout/private.layout";
import ProtectedRoute from "@/shared/routers/protected-router.component";
import PublicRoute from "@/shared/routers//public-router.component";
import { Toaster } from "react-hot-toast";

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
      <Toaster />
    </QueryClientProvider>
  );
};

export default Root;
