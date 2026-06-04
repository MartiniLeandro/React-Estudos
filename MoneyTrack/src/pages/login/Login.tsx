import { useState, type SubmitEvent } from "react"
import api from "../../services/Api"
import type { LoginRequest } from "../../types/Auth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { ChartNoAxesColumnIncreasing, Lock, PieChart } from "lucide-react"
import imageLogin from '../../../public/image login.png'
import logo from '../../../public/logo (2).png'

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

    return(
        <div className="min-h-screen flex text-white relative overflow-hidden">

            <div className="absolute inset-0 bg-linear-to-br from-[#0B0F14] via-[#0E1621] to-[#0B0F14]" />

            {/*MAIN*/}
            <div className="absolute w-125 h-125 bg-green-500/10 blur-[120px] rounded-full top-1/2 left-1/3 -translate-y-1/2"/>
            <div className="relative flex w-full">
                <div className="hidden md:flex w-1/2 flex-col justify-center ml-16">
                    <div>
                        <img src={logo} className="max-w-2xs -ml-9"/>
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">Bem vindo de volta!</h2>
                        <p className="text-gray-400 mb-10">Faça login para continuar gerenciando suas finanças</p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#121821]/80 p-3 rounded-xl"><ChartNoAxesColumnIncreasing className="text-green-500"/></div>
                            <div>
                                <h3 className="font-medium">Acompanhe seus gastos</h3>
                                <p className="text-gray-400 text-sm">Visualize seus lançamentos e saldos em tempo real</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-[#121821]/80 p-3 rounded-xl"><PieChart className="text-green-500"/></div>
                            <div>
                                <h3 className="font-medium">Organize por categorias</h3>
                                <p className="text-gray-400 text-sm">Veja para onde seu dinheiro está indo</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-[#121821]/80 p-3 rounded-xl"><Lock className="text-green-500"/></div>
                            <div>
                                <h3 className="font-medium">Seus dados seguros</h3>
                                <p className="text-gray-400 text-sm">Segurança de ponta</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative -mb-20">
                        <img src={imageLogin} className="max-w-2/3"/>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-20 bg-green-500/20 blur-3xl rounded-full"/>
                    </div>
                </div>


                {/*FORMULÁRIO*/}
                <div className="flex w-full md:w-1/2 items-center justify-center mr-6">

                    <div className="w-full max-w-xl bg-[#121821]/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/5">

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
                            <button  type="button" className="w-full py-3 border border-white/10 rounded-lg hover:bg-white/5 transition cursor-pointer">Entrar com Google</button>
                            <p className="text-center text-sm text-gray-400 mt-4"> Ainda não tem uma conta?{" "} <span className="text-green-500 hover:underline cursor-pointer">cadastre-se</span>
                            </p>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    )
}