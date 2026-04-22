import { FiLogOut } from "react-icons/fi";

export function Header(){

    function logout(){
        localStorage.clear
    }

    return(
        <header className="flex flex-row items-center justify-between w-full max-w-3xl bg-white mt-7 p-2.5 rounded-sm">
            <div className="flex flex-row gap-5">
                <a href="/">Home</a>
                <a href="/">Links</a>
                <a href="/medias">Redes Sociais</a>
            </div>
            <div>
            <a href="/login" onClick={logout}><FiLogOut className="rotate-180 text-red-600"/></a>
            </div>
        </header>
    )
}