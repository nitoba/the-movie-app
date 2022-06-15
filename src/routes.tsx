import {
  BrowserRouter,
  Route,
  Routes as RouterProvider,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { DetailsPage } from "./pages/details";
import { HomePage } from "./pages/home";

export function Routes() {
  return (
    <BrowserRouter>
      <Navbar />
      <RouterProvider>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:typeContent/:id" element={<DetailsPage />} />
      </RouterProvider>
    </BrowserRouter>
  );
}
