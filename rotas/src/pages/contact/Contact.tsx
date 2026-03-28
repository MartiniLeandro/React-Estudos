import { Link } from "react-router-dom"

function Contact(){
    return(
        <div>
            <h1>Bem vindo a página de contatos!</h1>
            <h3>Telefone: (xx) xxxx-xxxx</h3>
            <Link to="/">Home</Link>
            <Link to="/about">Sobre</Link>
        </div>
    )
}

export default Contact