import ReactDOM from "react-dom/client";
import "@assets/scss/app.scss";
import { router } from "../src/router/Router";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
