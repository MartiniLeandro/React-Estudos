import { ChartColumn, Fingerprint, LockKeyhole, Mail, ShieldCheck, User, Users } from "lucide-react";
import AuthLayout from "../../components/AuthLayout";
import { Link } from "react-router-dom";
import GoogleIcon from "../../components/GoogleIcon";

export default function Register(){

    const features = [
        {
            icon: <Users className="text-green-500"/>,
            title: "Cadastro simples",
            description: "Preencha seus dados e crie sua conta em poucos segundos"
        },
        {
            icon: <ShieldCheck className="text-green-500"/>,
            title: "Seus dados protegidos",
            description: "Utilizamos criptografia e boas práticas de segurança"
        },
        {
            icon: <ChartColumn className="text-green-500"/>,
            title: "Controle total",
            description: "Tenha tudo na palma da mão e tome decisões melhores"
        },
    ]

    return(
        <AuthLayout 
            title={<h2>Crie a sua conta e <span className="text-green-500">comece agora!</span></h2>}
            subtitle="É rápido, fácil e gratuito. Organize agora suas finanças de forma inteligente"
            featuresItems={features}
        >
            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">Criar sua conta</h2>
                <p className="text-gray-400 mb-6">Preencha seus dados para criar sua conta no <span className="text-green-500">MoneyTrack</span></p>
            </div>

            <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Nome</label>
                        <div className="flex items-center gap-3 bg-[#0B0F14] border border-white/10 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 transition">
                            <User className="text-gray-500 w-5 h-5"/>
                            <input type="text" placeholder="Seu nome completo" className="bg-transparent outline-none w-full text-white placeholder:text-gray-600"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">CPF</label>
                        <div className="flex items-center gap-3 bg-[#0B0F14] border border-white/10 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 transition">
                            <Fingerprint className="text-gray-500 w-5 h-5"/>
                            <input type="text" placeholder="000.000.000-00" className="bg-transparent outline-none w-full text-white placeholder:text-gray-600"/>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Email</label>
                        <div className="flex items-center gap-3 bg-[#0B0F14] border border-white/10 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 transition">
                            <Mail className="text-gray-500 w-5 h-5"/>
                            <input type="email" placeholder="seu@email.com" className="bg-transparent outline-none w-full text-white placeholder:text-gray-600"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Senha</label>
                        <div className="flex items-center gap-3 bg-[#0B0F14] border border-white/10 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 transition">
                            <LockKeyhole className="text-gray-500 w-5 h-5"/>
                            <input type="password" placeholder="******" className="bg-transparent outline-none w-full text-white placeholder:text-gray-600"/>
                        </div>
                    </div>
                </div>
                <button type="submit" className="w-full py-3 mt-4 bg-green-500 hover:bg-green-600 transition rounded-lg font-medium shadow-lg shadow-green-500/20 cursor-pointer text-white">
                    Criar conta
                </button>
                <div className="flex items-center gap-4 my-4">
                    <div className="flex-1 h-px bg-white/10"></div>
                    <span className="text-gray-400 text-sm">ou</span>
                    <div className="flex-1 h-px bg-white/10"></div>
                </div>
                <button  type="button" className="w-full py-3 border border-white/10 rounded-lg hover:bg-white/5 transition cursor-pointer flex items-center justify-center gap-2">Cadastrar com Google<GoogleIcon/></button>
                <p className="text-center text-sm text-gray-400 mt-4"> Já tem uma conta?{" "} <Link to="/login"><span className="text-green-500 hover:underline cursor-pointer">Entrar</span></Link>
                </p>
            </form>
        </AuthLayout>
    )
}