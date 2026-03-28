import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import { Product } from "./pages/products/Product";
import { NotFound } from "./pages/notFound/NotFound";
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
        path: "/about",
        element: <About/>
    },
    {
        path: "/contacts",
        element: <Contact/>
    },
    {
        path: "/products/:id",
        element: <Product/>
    },
    {
        path: "*",
        element: <NotFound/>
    }
        ]   
    }
])

export default router;