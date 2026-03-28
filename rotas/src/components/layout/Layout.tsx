import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";

export function Layout(){
    return(
        <>
            <Header/>
            <Outlet/>
            <footer>
                <span>Todos direitos reservados @2024</span>
            </footer>
        </>
    )
}