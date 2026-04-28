import { useState, type SubmitEvent } from "react"
import api from "../../services/Api"
import type { LoginRequest } from "../../types/Auth"

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function testeLogin(e: SubmitEvent){
        e.preventDefault()

        const dadosLogin: LoginRequest = {email, password}
        console.log(dadosLogin)
        const response = await api.post<LoginRequest>("/authentication/login",dadosLogin)
        const token = response.data;
        console.log(token)
        
    }

    return(
        <div>
            <form onSubmit={testeLogin}>
                <input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>    
                <input type="text" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">acessar</button>
            </form>

        </div>
    )
}