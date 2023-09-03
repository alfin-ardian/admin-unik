import { createBrowserRouter } from "react-router-dom";
import { Login, Dashboard } from "../components/common/pages";
import { RootView } from "./RootView";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RootView />,
    children: [{ path: "/", element: <Dashboard /> }],
  },
]);

export default router;
