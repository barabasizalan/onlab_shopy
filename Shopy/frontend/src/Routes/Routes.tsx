import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ChangePassword from "../Pages/ChangePassword";

export const router = createBrowserRouter(
    [
        {path: "/login", element: <Login />},
        {path: "/", element: <Home />},
        {path: "/register", element: <Register />},
        {path: "/changePassword", element: <ChangePassword />},   
    ]
);