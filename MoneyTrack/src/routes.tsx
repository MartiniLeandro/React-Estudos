import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";

const routes = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/",
        element:<Home/>
    }
])

export default routes