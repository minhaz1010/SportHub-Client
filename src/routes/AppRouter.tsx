import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorElement from "../components/ErrorElement/ErrorElement";
import Home from "../pages/Home";

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
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;
export default AppRoutes;
