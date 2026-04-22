import { FiPaperclip } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

export function Admin(){
    return(
        <div className="flex flex-col justify-center items-center">
            <Header/>
            <form className="m-7 flex flex-col w-full max-w-xl gap-3">
                <label className="text-white">Nome do link</label>
                <Input placeholder="Nome do seu link"/>
                <label className="text-white">URL do link</label>
                <Input placeholder="Digite a url..."/>
                <div className="flex gap-28 mb-7 mt-5">
                    <div className="flex items-end gap-2.5">
                        <label className="text-white">Fundo do link</label>
                        <input type="color" className="min-w-1/12 h-11 bg-zinc-800 border border-white p-1 rounded-md cursor-pointer appearance-none"/>
                    </div>
                    <div className="flex items-end gap-2.5">
                        <label className="text-white">Cor do link</label>
                        <input type="color" className="min-w-1/12 h-11 bg-zinc-800 border border-white p-1 rounded-md cursor-pointer appearance-none"/>
                    </div>
                </div>
                <button type="submit" className="bg-blue-700 p-1 text-white rounded-sm cursor-pointer">Cadastrar <FiPaperclip className="inline"/></button>
            </form>
            <h1 className="text-white">Meus links</h1>
        </div>
    )
}