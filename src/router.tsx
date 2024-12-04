import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Student from "./pages/Student";

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "students",
        element: <Student />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
