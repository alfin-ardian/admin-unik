import { createBrowserRouter } from "react-router-dom";
import {
  Login,
  Dashboard,
  Daerah,
  DetailDaerah,
} from "@components/common/pages";
import { RootView } from "./RootView";

// check token in localStorage, otherwise redirect to login page
const isTokenValid = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: isTokenValid() ? <RootView /> : <Login />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/daerah", element: <Daerah /> },
      { path: "/daerah/detail", element: <DetailDaerah /> },
    ],
  },
]);

export default router;
