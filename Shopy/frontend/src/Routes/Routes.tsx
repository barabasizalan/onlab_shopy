import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import App from "../App";
import Sell from "../Pages/Sell";
import UsersProducts from "../Pages/UsersProducts";
import ProductSearchPage from "../Pages/ProductSearchPage";
import ProductDetailPage from "../Pages/ProductDetailPage";
import UsersOrdersPage from "../Pages/UsersOrdersPage";
import ProfileSettingsPage from "../Pages/ProfileSettingsPage";
import Checkout from "../Pages/Checkout";

export const router = createBrowserRouter(
    [
        {path: "/login", element: <Login />},
        {path: "/", element: <App />},
        {path: "/register", element: <Registration />}, 
        {path: "/product/:productId", element: <ProductDetailPage />},
        {path: "/sell", element: <Sell />},
        {path: "/myproducts", element: <UsersProducts />},
        {path: "/search", element: <ProductSearchPage />},
        {path: "/myorders", element: <UsersOrdersPage />},
        {path: "/settings", element: <ProfileSettingsPage />},
        {path: "/checkout", element: <Checkout />}
    ]
);