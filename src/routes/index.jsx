import React from "react";
import { useRoutes } from "react-router-dom";
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
import FormProfile from "../pages/profile/profile";

export default function Router() {
  const routing = useRoutes([
    // trang phim
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        // trang tổng Outlet
        {
          path: "/",
          element: <Home />,
        },
        // trang danh sách phim
        {
          path: "/movie",
          element: <MovieList />,
        },
        // trang phim chi tiết
        {
          path: "/movie/:movieId",
          element: <MovieDetail />,
        },
        // trang bảo vệ trước khi vào trang booking
        {
          path: "/",
          element: <AuthGuard />,
          children: [
            {
              path: "/booking/:maLichChieu",
              element: <Booking />,
            },
            {
              path: "/profile",
              element: <FormProfile />,
            },
          ],
        },
        // trang ngăn lạ khi đăng nhập rồi không vào login hay register nữa
        {
          path: "/",
          element: <NoAuthGuard />,
          children: [
            {
              path: "/login",
              element: <FormLogin />,
            },
            {
              path: "/register",
              element: <FormRegister />,
            },
          ],
        },
      ],
    },
    // trang admin
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        // ngăn những tài khoản không phải QuanTri vào trang admin
        {
          path: "/admin/",
          element: <AdminGuard />,
          children: [
            {
              path: "/admin/movie-management",
              element: <MovieManagement />,
            },
            {
              path: "/admin/user-management",
              element: <UserManagement />,
            },
          ],
        },
      ],
    },
  ]);
  return routing;
}
