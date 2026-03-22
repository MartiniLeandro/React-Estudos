import {useState} from "react";
import "./RenderizacaoCondicional.css"

function RenderizacaoCondicional(){
    const [signed,setSigned] = useState(false)
    
    function userEnter(){
        setSigned(true)
    }

    return(
        <div>
            {signed ? (
                <h1 className={signed ? "teste" : ""}>Bem vindo Leandro</h1>
            ) : (<h1>Clique no botão para entrar</h1>
            )}
            <button onClick={userEnter}>Entrar</button>
            {signed && <button onClick={() => setSigned(false )}>sair</button>}
            
        </div>
    )
}

export default RenderizacaoCondicional;