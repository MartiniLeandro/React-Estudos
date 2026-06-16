import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/LoginPage";
import Home from "./pages/home/HomePage";
import Launches from "./pages/launches/LaunchesPage";
import Register from "./pages/register/RegisterPage";
import Categorias from "./pages/categorias/CategoriasPage";

const routes = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element: <Register/>
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
        path:"/categories",
        element: <Categorias/>
    }
])

export default routes