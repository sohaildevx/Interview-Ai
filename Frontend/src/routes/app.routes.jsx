import {createBrowserRouter} from "react-router-dom";
import {Login, Register} from "../features/auth/pages/page";
import {Protected} from "../features/auth/components/Proctected";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path:"/",
        element: <Protected><h1>Home Page</h1></Protected>
    }
])