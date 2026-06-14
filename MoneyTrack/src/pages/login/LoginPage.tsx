import { useState, type SubmitEvent } from "react"
import api from "../../services/Api"
import type { LoginRequest } from "../../types/Auth"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { ChartNoAxesColumnIncreasing, Lock, PieChart } from "lucide-react"
import AuthLayout from "../../components/AuthLayout"
import { GoogleLogin } from "@react-oauth/google"

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function login(e: SubmitEvent){
        e.preventDefault()

        const dadosLogin: LoginRequest = {email, password}
        if(!dadosLogin.email || dadosLogin.email.trim() === ""){
            toast.error("Por favor, adicione o seu email")
            return;
        }
        if(!dadosLogin.password || dadosLogin.password.trim() === ""){
            toast.error("Por favor, adicione a sua senha")
            return;
        }

        try{
            const response = await api.post("/authentication/login",dadosLogin)
            const token = response.data.token;
            localStorage.setItem("token",token)
            toast.success("Login realizado com sucesso")
            navigate("/")
        }catch(error: any){
           if(error.response?.data?.message){
                toast.error(error.response.data.message)
           }else{
            toast.error("Erro interno. Por favor, tente novamente mais tarde")
           }

        }
    }

    async function loginWithGoogle(credentialResponse: any){

        const tokenGoogle = credentialResponse.credential;

        try{
            const response = await api.post("/authentication/login/google", {tokenGoogle: tokenGoogle})
            const token = response.data.token;
            localStorage.setItem("token", token)
            navigate("/")
            toast.success("Login realizado com sucesso")
        }catch(error: any){
            if(error.response?.data?.message){
                toast.error(error.response.data.message)
           }else{
            toast.error("Erro interno. Por favor, tente novamente mais tarde")
           }
        }
    }

    const featuresDoLogin = [
        {   icon: <ChartNoAxesColumnIncreasing className="text-green-500"/>,
            title: "Acompanhe seus gastos",
            description: "Visualize seus lançamentos e saldos em tempo real"
        },
        {   icon: <PieChart className="text-green-500"/>,
            title: "Organize por categorias",
            description: "Veja para onde seu dinheiro está indo"
        },
        {   icon: <Lock className="text-green-500"/>,
            title: "Seus dados seguros",
            description: "Segurança de ponta"
        },
    ]

    return(

        <AuthLayout title={<>Bem-vindo de <span className="text-green-500">volta!</span></>} subtitle="Faça login para continuar gerenciando suas finanças" 
            featuresItems={featuresDoLogin}
        >
            <h2 className="text-2xl font-semibold mb-2">
                Entrar na sua conta
            </h2>

            <p className="text-gray-400 mb-6">
                Use suas credenciais para acessar o MoneyTrack
            </p>

            <form onSubmit={login} className="space-y-4">
                <div>
                    <label className="text-sm text-gray-400">E-mail</label>
                    <input type="text" placeholder="seu@email.com" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full mt-1 px-4 py-3 bg-[#0B0F14] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                    <label className="text-sm text-gray-400">Senha</label>
                    <input type="password" placeholder="******" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full mt-1 px-4 py-3 bg-[#0B0F14] border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>
                <div className="text-right">
                    <a className="text-sm text-green-500 hover:underline cursor-pointer">Esqueceu sua senha</a>
                </div>
                <button type="submit" className="w-full py-3 bg-green-500 hover:bg-green-600 transition rounded-lg font-medium shadow-lg shadow-green-500/20 cursor-pointer">Entrar</button>
                <div className="flex items-center gap-4 my-4">
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-gray-400 text-sm">ou</span>
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>
                <GoogleLogin onSuccess={loginWithGoogle} onError={() => toast.error("Falha ao abrir o google")} theme="filled_black" shape="rectangular"/>
                <p className="text-center text-sm text-gray-400 mt-4"> Ainda não tem uma conta?{" "} <Link to="/register"><span className="text-green-500 hover:underline cursor-pointer">cadastre-se</span></Link>
                </p>
            </form> 
    </AuthLayout>
    )
}