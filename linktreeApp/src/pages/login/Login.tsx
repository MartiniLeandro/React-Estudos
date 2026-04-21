import {Link} from 'react-router'
import { Input } from '../../components/Input'
import { useState, type SubmitEvent } from 'react'

export function Login(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    function login(e: SubmitEvent){
        e.preventDefault()
        console.log(email)
        console.log(password)
    }


    return(
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <Link to="/">
                <h1 className=" text-white font-bold text-5xl mb-8">Dev
                <span className="bg-linear-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
                </h1>
            </Link>
            <form className="flex flex-col items-center justify-center w-full max-w-md gap-4" onSubmit={login}>
                <Input type='text' placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <Input placeholder='***********' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="w-full bg-blue-500 text-white p-1 rounded-sm">Acessar</button>
            </form>
        </div>
    )
}