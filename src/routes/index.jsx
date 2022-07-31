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
import Users from "../pages/admin/users";
import FilmList from "../pages/admin/film-list";
import ShowTimes from "../modules/show-times/show-times";


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
          path: "/login",
          element: <FormLogin />,
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
          path: "/booking/:maLichChieu",
          element: <Booking />,
        },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        {
          path: '/admin',
          element: <Navigate to='/admin/users'/>,
        },
        {
          path: '/admin/users',
          element: <Users />,
        },{
          path: '/admin/films',
          element: <FilmList />,
        },
        {
          path: '/admin/show-times',
          element: <ShowTimes />,
        },
      ]
    }
  ]);
  return routing;
}
