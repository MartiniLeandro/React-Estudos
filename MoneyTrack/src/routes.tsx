import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/LoginPage";
import Home from "./pages/home/HomePage";
import Launches from "./pages/launches/LaunchesPage";

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
    }
])

export default routes