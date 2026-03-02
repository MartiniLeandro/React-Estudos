import { useState } from "react";

interface InfosAluno {
    nome: string,
    idade: string;
}

interface UserInfo {
    nome: string,
    cargo: string;
}

function UseState() {

    const[nome, setNome] = useState("");
    const[idade, setIdade] = useState("");
    const[infoAluno, setInfoAluno] = useState<InfosAluno>();
    const[contador, setContador] = useState<number>(0)
    const[user, setUser] = useState<UserInfo>({nome: "visitante", cargo: ""})

    function mostrarAlunoIdade(){
        setInfoAluno({nome: nome, idade: idade})
    }

    function aumentarContador(){
        setContador(contador + 1)
    }

    function diminuirContador(){
        if(contador === 0) return
        setContador(contador - 1)
    }

    const loginUser = () => {
        setUser({nome: "Leandro", cargo: "Programador"})
    }

    const logoutUser = () => {
        setUser({nome: "visitante", cargo: ""})
    }

    return(
        <div>
            <h1>Conhecendo UseState</h1>
            <input placeholder="Digite o nome" value={nome} onChange={e => setNome(e.target.value)}/>
            <br />
            <input placeholder="Digite a sua idade" value={idade} onChange={e => setIdade(e.target.value)}/>
            <br />
            <button onClick={mostrarAlunoIdade}> Mostrar aluno</button>
            <hr />
            <h3>Nome: {infoAluno?.nome}</h3>
            <h3>Idade: {infoAluno?.idade}</h3>
            <hr />
            <h2>Contador</h2>
            <p>{contador}</p>
            <button onClick={aumentarContador}>+</button>
            <button onClick={diminuirContador}>-</button>
            <br /><br />
            <hr />
            <button onClick={loginUser}>Entrar</button>
            <button onClick={logoutUser}>Sair</button>
            <h4>Olá {user.nome}</h4>
            <p>{user.cargo}</p>
        </div>
    )
}

export default UseState;