import { createBrowserRouter } from "react-router-dom";
import { Login } from "../components/common/pages/auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

export default router;
