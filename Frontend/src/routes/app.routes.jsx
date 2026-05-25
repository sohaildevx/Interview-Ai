import {createBrowserRouter} from "react-router-dom";
import {Login, Register} from "../features/auth/pages/page";
import {Protected} from "../features/auth/components/Proctected";
import Home from "../features/interview/pages/Home";
import Interview from "../features/interview/pages/Interview";

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
        element: <Protected><Home/></Protected>
    },
    {
        path:"/interview/:interviewId",
        element: <Protected><Interview/></Protected>
    }
])