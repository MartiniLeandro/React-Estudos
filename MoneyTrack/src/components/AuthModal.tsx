import { Fingerprint } from "lucide-react";
import { useState } from "react";
import api from "../services/Api";
import toast from "react-hot-toast";
import {useNavigate } from "react-router-dom";
import { LoadingModal } from "./LoadingModal";

interface modalProps{
    openModal:boolean;
    onClose: () => void;
    tokenGoogle: string
}

export function AuthModal({openModal, onClose, tokenGoogle}: modalProps){
    const [cpf, setCpf] = useState("")
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function registerGoogle(){

        if (!cpf || cpf.length < 11) {
            toast.error("Por favor, digite um CPF válido");
            return;
        }

        try{
            const response = await api.post("/authentication/register/google", {tokenGoogle: tokenGoogle, cpf: cpf})
            setIsLoading(true)
            localStorage.setItem("token", response.data.token)
            toast.success("Conta criada com sucesso")
            onClose();
            navigate("/")
        }catch(error: any){
            console.log(error)
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Erro interno. Por favor, tente novamente.");
            }
        }finally{
            setIsLoading(false)
        }
    }

    if(!openModal) return
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
                <div className=" bg-[#121821] rounded-2xl border border-white/10 p-6 w-1/4 h-2/5 flex flex-col items-center justify-around">
                    <div className="flex flex-col items-center gap-3">
                        <h2 className="text-3xl">Você está quase lá!</h2>
                        <p className="text-gray-400 text-center">Para finalizar o seu cadastro, <br/>basta digitar um CPF válido abaixo.</p>     
                    </div>
                    <div className="flex items-center gap-3 bg-[#0B0F14] border border-white/10 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 transition">
                            <Fingerprint className="text-gray-500 w-5 h-5"/>
                            <input type="text" placeholder="000.000.000-00" className="bg-transparent outline-none w-full text-white placeholder:text-gray-600" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                        </div>
                    <div className="gap-2.5 flex">
                        <button className="border border-white/10 px-2.5 py-2.5 rounded-sm cursor-pointer" onClick={() => {onClose(), setCpf("")}}>Cancelar</button>
                        <button className="border border-white/10 px-2.5 py-2.5 rounded-sm cursor-pointer bg-emerald-500/70" onClick={registerGoogle}>Finalizar cadastro</button>
                    </div>
                </div>
                <LoadingModal isVisible={isLoading}/>
        </div>
    )
}