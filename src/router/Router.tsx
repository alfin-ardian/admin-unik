import { createBrowserRouter } from "react-router-dom";
import {
  Login,
  Dashboard,
  Daerah,
  AddDaerah,
  DetailDaerah,
} from "@components/common/pages";
import { RootView } from "./RootView";
import { Component } from "react";

// const navigate = useNavigate();
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
      { path: "/daerah", element: <Daerah /> },
      { path: "/daerah/tambah", element: <AddDaerah /> },
      { path: "/daerah/detail", element: <DetailDaerah /> },
    ],
  },
]);

export default router;
