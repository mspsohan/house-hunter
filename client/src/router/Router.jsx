import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/HomePage/Home";
import Authentication from "../pages/Authentication/Authentication";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import AddHouse from "../pages/Dashboard/AddHouse/AddHouse";
import UpdateHouse from "../pages/Dashboard/UpdateHouse/UpdateHouse";

const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout />,
      errorElement: <div>Errroorr........</div>,
      children: [
         {
            index: true,
            element: <Home />
         },
      ]
   },
   {
      path: "/login",
      element: <Authentication />
   },
   {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
         {
            index: true,
            element: <DashboardHome />
         },
         {
            path: "/dashboard/addhouse",
            element: <AddHouse />
         },
         {
            path: "/dashboard/updatehouse/:id",
            element: <UpdateHouse />
         }
      ]
   }
])

export default router