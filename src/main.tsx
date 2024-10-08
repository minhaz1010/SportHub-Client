import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRouter.tsx";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import "@smastrom/react-rating/style.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <AppRoutes />
    </Provider>
  </StrictMode>,
);
