import { createBrowserRouter } from "react-router-dom";
import Details from "./pages/details/Details";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import { Layout } from "./components/layout/Layout";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
            path: "/details/:cripto",
            element: <Details/>
            },
            {
                path: "*",
                element: <NotFound/>
            }
        ]
    }
    
])

export default router;