import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from './layout/Main'
import Home from './pages/Home'
import Films from "./pages/Films";
import NotFound from "./pages/NotFound";
import SingleFilm from "./pages/SingleFilm";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Auth from "./layout/Auth";
import PopularShows from "./pages/PopularShows";

const PrivateRoute = ({children}) => {
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) {
        return <Navigate to='/auth/login' />;
    }

    return children;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/films",
                element: <Films />,
            },
            {
                path: "/popular",
                element: <PrivateRoute><PopularShows /></PrivateRoute>,
            },
            {
                path: '/films/:filmId',
                element: <PrivateRoute><SingleFilm /></PrivateRoute>,
            },
        ],
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "registration",
                element: <Register />,
            },
        ],
    },
]);

export default router;