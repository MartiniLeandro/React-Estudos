import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router";

export function Header(){

    function logout(){
        localStorage.clear()
    }

    return(
        <header className="flex flex-row items-center justify-between w-full max-w-3xl bg-white mt-7 p-2.5 rounded-sm">
            <div className="flex flex-row gap-5 font-medium">
                <Link to="/">Home</Link>
                <Link to="/">Links</Link>
                <Link to="/medias">Redes sociais</Link>
            </div>
            <div>
            <Link to="/login" onClick={logout}><FiLogOut className="rotate-180 text-red-600"/></Link>
            </div>
        </header>
    )
}