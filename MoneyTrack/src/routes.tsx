import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/LoginPage";
import Home from "./pages/home/HomePage";
import Launches from "./pages/launches/LaunchesPage";
import Register from "./pages/register/RegisterPage";

const routes = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/launches",
        element: <Launches/>
    },
    {
        path:"/register",
        element: <Register/>
    }
])

export default routes