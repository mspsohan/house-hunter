import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/HomePage/Home";
import Authentication from "../pages/Authentication/Authentication";

const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout />,
      errorElement: <div>Errroorr........</div>,
      children: [
         {
            path: "/",
            element: <Home />
         },
         {
            path: "/login",
            element: <Authentication />
         }
      ]
   }
])

export default router