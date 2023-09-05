import { createBrowserRouter } from "react-router-dom";
import {
  Login,
  Dashboard,
  Daerah,
  DetailDaerah,
} from "@components/common/pages";
import { RootView } from "./RootView";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RootView />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/daerah", element: <Daerah /> },
      { path: "/daerah/detail", element: <DetailDaerah /> },
    ],
  },
]);

export default router;
