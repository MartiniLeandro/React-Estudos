import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";
import toast from "react-hot-toast";

export function useGoogleAuth(){
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [tokenGoogle, setTokenGoogle] = useState("")

    async function loginWithGoogle(credentialResponse: any){

        const tokenGoogle = credentialResponse.credential
        
        try{
            const response = await api.post("/authentication/login/google", {tokenGoogle: tokenGoogle})
            const token = response.data.token;
            localStorage.setItem("token", token)
            navigate("/")
            toast.success("Login realizado com sucesso")
        }catch(error: any){
            if(error.response?.status == 404){
                setTokenGoogle(tokenGoogle);
                setShowAuthModal(true)
           }else{
            toast.error("Erro interno. Por favor, tente novamente mais tarde")
           }
        }
    }

    return {loginWithGoogle, showAuthModal, setShowAuthModal, tokenGoogle}
}