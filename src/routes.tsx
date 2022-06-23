import {
  BrowserRouter,
  Route,
  Routes as RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { FiltersProvider } from "./contexts/content-context";
import { DetailsPage } from "./pages/details";
import { HomePage } from "./pages/home";

export function Routes() {
  return (
    <BrowserRouter>
      <FiltersProvider>
        <ToastContainer style={{ fontSize: "2rem" }} theme="dark" />
        <Navbar />
        <RouterProvider>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:typeContent/:id" element={<DetailsPage />} />
        </RouterProvider>
        <Footer />
      </FiltersProvider>
    </BrowserRouter>
  );
}
