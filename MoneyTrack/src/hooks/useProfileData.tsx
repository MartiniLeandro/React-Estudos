import { useState } from "react";
import api from "../services/Api";
import toast from "react-hot-toast";

export function useProfileData(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    async function getProfileData(){
    const token = localStorage.getItem("token")
    try{
      const response = await api.get("/users/me", {headers: {Authorization: `Bearer ${token}`}})
      setName(response.data.name);
      setEmail(response.data.email)
    }catch(error:any){
      if(error.response?.data?.message){
        toast.error(error.response?.data?.message)
      }else{
        toast.error("Erro interno. Por favor, tente novamente mais tarde")
      }
    }
  }

  return {getProfileData, name, email};
}