import { Link } from "react-router-dom";
import "./Header.css"

export function Header(){
    return(
        <header>
            <h2>Sujeito programador</h2>
            <div>
                <Link to="/">Home</Link>
                <Link to="/about">Sobre</Link>
                <Link to="/contacts">Contatos</Link>
            </div>
        </header>
    )
}