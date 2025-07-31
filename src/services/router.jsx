import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BookDetail from "../pages/BookDetail";
import Signup from "../pages/Register";
import Signin from "../pages/Login";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
    {path:'/', element: <App/>},
    {path:'/signup', element: <Signup/>},
    {path:'/signin', element: <Signin/>},
    {path:'/details', element: <PrivateRoute><BookDetail/></PrivateRoute> },
])