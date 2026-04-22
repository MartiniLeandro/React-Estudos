import { FiPaperclip } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

export function SocialMedia(){
    return(
        <div className="flex flex-col justify-center items-center">
            <Header/>
            <h1 className="text-white text-3xl font-bold m-6">Suas redes sociais</h1>
            <form className="flex flex-col w-full max-w-xl mt-3 gap-2.5">
                <label className="text-white">Link Facebook</label>
                <Input placeholder="Digite a url..."/>
                <label className="text-white">Link Instagram</label>
                <Input placeholder="Digite a url..."/>
                <label className="text-white">Link Youtube</label>
                <Input placeholder="Digite a url..."/>
                <button type="submit" className="bg-blue-700 p-1 text-white rounded-sm cursor-pointer mt-2">Salvar links <FiPaperclip className="inline"/></button>
                
            </form>
        </div>
    )
}