import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import HomeLayout from "../layouts/home";
import MovieList from "../modules/movie-list/movie-list";
import Home from "../pages/home/home";
import MovieDetail from "../pages/movie-detail/movie-detail";
import FormLogin from "../pages/formLogin/formLogin";
import FormRegister from "../pages/formRegister/formRegister";
import Booking from "../pages/booking/booking";
import AdminLayout from "../layouts/admin";
import NoAuthGuard from "../pages/guards/noAuth.guard";
import AuthGuard from "../pages/guards/auth.guard";
import MovieManagement from "../pages/movie-management/movie-management";
import UserManagement from "../pages/user-management/user-management";
import AdminGuard from "../pages/guards/admin.guard";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movie",
          element: <MovieList />,
        },
        {
          path: "/register",
          element: <FormRegister />,
        },
        {
          path: "/movie/:movieId",
          element: <MovieDetail />,
        },
        {
          path: "/",
          element: <AuthGuard />,
          children: [
            {
              path: "/booking/:maLichChieu",
              element: <Booking />,
            },
          ],
        },
        {
          path: "/",
          element: <NoAuthGuard />,
          children: [
            {
              path: "/login",
              element: <FormLogin />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/",
          element: <AdminGuard />,
          children: [
            {
              path: "/admin/",
              element: <Navigate to='/admin/movie-management' />,
            },
            {
              path: "/admin/movie-management",
              element: <MovieManagement />,
            },
            {
              path: "/admin/user-management",
              element: <UserManagement />,
            },
          ]
        },
      ],
    },
  ]);
  return routing;
}
