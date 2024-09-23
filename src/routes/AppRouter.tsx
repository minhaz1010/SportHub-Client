import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorElement from "../components/ErrorElement/ErrorElement";
import Home from "../pages/Home";
import About from "@/pages/About";
import AllProducts from "@/pages/AllProducts";
import ManageProducts from "@/pages/ManageProducts";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import CheckOut from "@/pages/CheckOut";
import SuccessFull from "@/pages/SuccessFull";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: `products/:slug`,
        element: <ProductDetails />
      },
      {
        path: "/manage-products",
        element: <ManageProducts />,
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/checkout",
        element: <CheckOut />
      },
      {
        path: "/successful",
        element: <SuccessFull />
      }
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;
export default AppRoutes;
