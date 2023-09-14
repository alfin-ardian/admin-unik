import { createBrowserRouter } from "react-router-dom";
import {
  Login,
  Dashboard,
  CalonUser,
  AddCalonUser,
  DetailCalonUser,
  DataUser,
  DetailDataUser,
  CalonTim,
  DataTim,
  AddDataTim,
  Daerah,
  AddDaerah,
  DetailDaerah,
  Desa,
  AddDesa,
  DetailDesa,
  Kelompok,
  AddKelompok,
} from "@components/common/pages";
import { RootView } from "./RootView";
import { Component } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    const currentUser = window.localStorage.getItem("currentUser");
    if (!currentUser) {
      window.location.href = "/login";
      return null;
    }

    if (this.state.hasError) {
      // window.location.href = "/login";
      return null;
    }

    return this.props.children;
  }
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <RootView />
      </ErrorBoundary>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/calon/user", element: <CalonUser /> },
      { path: "/calon/user/tambah", element: <AddCalonUser /> },
      { path: "/calon/user/detail", element: <DetailCalonUser /> },
      { path: "/data/user", element: <DataUser /> },
      { path: "/data/user/detail", element: <DetailDataUser /> },
      { path: "/calon/tim-pernikahan", element: <CalonTim /> },
      { path: "/daerah", element: <Daerah /> },
      { path: "/daerah/tambah", element: <AddDaerah /> },
      { path: "/daerah/detail", element: <DetailDaerah /> },
      { path: "/desa", element: <Desa /> },
      { path: "/desa/tambah", element: <AddDesa /> },
      { path: "/desa/detail", element: <DetailDesa /> },
      { path: "/kelompok", element: <Kelompok /> },
      { path: "/kelompok/tambah", element: <AddKelompok /> },
      { path: "/data/tim-pernikahan", element: <DataTim /> },
      { path: "/data/tim-pernikahan/tambah", element: <AddDataTim /> },
    ],
  },
]);

export default router;
