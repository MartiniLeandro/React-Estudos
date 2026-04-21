import { createBrowserRouter } from "react-router"
import { Home } from "./pages/home/Home"
import { Admin } from "./pages/admin/Admin"
import { Login } from "./pages/login/Login"
import { NotFound } from "./pages/notFound/NotFound"

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/admin",
        element:<Admin/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"*",
        element:<NotFound/>
    }
])