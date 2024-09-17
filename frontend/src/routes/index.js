import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import { Home } from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../component/ForgotPassword";
import SignUp from "../pages/signUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";

const router = createBrowserRouter([
    {
        path: '/',
        element : <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "sing-up",
                element:<SignUp/>
            },
            {
                path: "admin-panel",
                element: <AdminPanel/>,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers/>
                    },
                    {
                        path: "all-products",
                        element: <AllProducts/>
                    }
                ]
            }
        ]
    }
])

export default router;