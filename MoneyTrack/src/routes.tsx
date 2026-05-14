import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Launches from "./pages/launches/Launches";

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