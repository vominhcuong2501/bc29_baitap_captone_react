import CumRap from "modules/cum-rap/cum-rap";
import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
// import HomeLayout from "../layouts/home";
// import MovieList from "../modules/movie-list/movie-list";
// import Home from "../pages/home/home";
// import MovieDetail from "../pages/movie-detail/movie-detail";
// import FormLogin from "../pages/formLogin/formLogin";
// import FormRegister from "../pages/formRegister/formRegister";
// import Booking from "../pages/booking/booking";
// import AdminLayout from "../layouts/admin";
// import NoAuthGuard from "../pages/guards/noAuth.guard";
// import AuthGuard from "../pages/guards/auth.guard";
// import MovieManagement from "../pages/movie-management/movie-management";
// import UserManagement from "../pages/user-management/user-management";
// import AdminGuard from "../pages/guards/admin.guard";
// import FormProfile from "../pages/profile/profile";
// import MovieCreate from "../pages/movie-create/movie-create";

// lazyLoading: sau khi thêm component suspense ở trang app.js => đặt biến cho đường link component
const HomeLayout = lazy(() => import("../layouts/home"));
const MovieList = lazy(() => import("../modules/movie-list/movie-list"));
const Home = lazy(() => import("pages/home/home"));
const MovieDetail = lazy(() => import("pages/movie-detail/movie-detail"));
const FormLogin = lazy(() => import("pages/formLogin/formLogin"));
const FormRegister = lazy(() => import("pages/formRegister/formRegister"));
const Booking = lazy(() => import("../modules/booking/booking"));
const AdminLayout = lazy(() => import("../layouts/admin"));
const NoAuthGuard = lazy(() => import("pages/guards/noAuth.guard"));
const AuthGuard = lazy(() => import("pages/guards/auth.guard"));
const MovieManagement = lazy(() =>
  import("pages/movie-management/movie-management")
);
const UserManagement = lazy(() =>
  import("pages/user-management/user-management")
);
const AdminGuard = lazy(() => import("pages/guards/admin.guard"));
const FormProfile = lazy(() => import("../modules/profile/profile"));
const MovieCreate = lazy(() => import("pages/movie-create/movie-create"));
const MovieShowTime = lazy(() =>
  import("../modules/movie-show-time/movie-show-time")
);
const CreateUser = lazy(() => import("pages/create-user/create-user"));
const MovieUpdate = lazy(() => import("pages/movie-update/movie-update"));
const UpdateUser = lazy(() => import("pages/update-user/update-user"));

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
        // trang cụm rạp
        {
          path: "/cum-rap",
          element: <CumRap />,
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
            // trang đặt vé
            {
              path: "/booking/:maLichChieu",
              element: <Booking />,
            },
            // trang cá nhân
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
            // trang đăng nhập
            {
              path: "/login",
              element: <FormLogin />,
            },
            // trang đăng ký
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
            // trang quản lý phim
            {
              path: "/admin/movie-management",
              element: <MovieManagement />,
            },
            // trang tạo phim
            {
              path: "/admin/movie-management/create-movie",
              element: <MovieCreate />,
            },
            // update phim
            {
              path: "/admin/movie-management/:movieId/update-movie",
              element: <MovieUpdate />,
            },
            // show-time
            {
              path: "/admin/movie-management/show-time/:movieId",
              element: <MovieShowTime />,
            },
            // trang quản lý người dùng
            {
              path: "/admin/user-management",
              element: <UserManagement />,
            },
            // create-user
            {
              path: "/admin/user-management/create-user",
              element: <CreateUser />,
            },
            // update-user
            {
              path: "/admin/user-management/:taiKhoan/update-user",
              element: <UpdateUser />,
            },
          ],
        },
      ],
    },
  ]);
  return routing;
}
