import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";

export const router = createBrowserRouter(
    [
        {path: "/login", element: <Login />},
        {path: "/", element: <Home />},
        {path: "/register", element: <Registration />},  
    ]
);