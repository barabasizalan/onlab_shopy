import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import ProductDetails from "../Pages/ProductDetails";
import App from "../App";

export const router = createBrowserRouter(
    [
        {path: "/login", element: <Login />},
        {path: "/", element: <App />},
        {path: "/register", element: <Registration />}, 
        {path: "/product/:id", element: <ProductDetails />},
        //{path: "/profile", element: <Profile />},
    ]
);