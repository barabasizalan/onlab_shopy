import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import ProductDetails from "../Pages/ProductDetails";
import App from "../App";
import Sell from "../Pages/Sell";

export const router = createBrowserRouter(
    [
        {path: "/login", element: <Login />},
        {path: "/", element: <App />},
        {path: "/register", element: <Registration />}, 
        {path: "/product/:id", element: <ProductDetails />},
        {path: "/sell", element: <Sell />},
    ]
);