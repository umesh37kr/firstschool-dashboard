import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import CreateStudent from "./pages/CreateStudent";
import Message from "./pages/Message";
import NoticeBoard from "./pages/NoticeBoard";
import Parent from "./pages/Parent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"dashboard/home"} />,
  },
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
      {
        path: "new-student",
        element: <CreateStudent />,
      },
      {
        path: "teacher",
        element: <Teacher />,
      },
      {
        path: "parent",
        element: <Parent />,
      },
      {
        path: "message",
        element: <Message />,
      },
      {
        path: "notice-board",
        element: <NoticeBoard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
