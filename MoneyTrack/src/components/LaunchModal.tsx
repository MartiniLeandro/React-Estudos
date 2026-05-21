import { useState } from "react";
import api from "../services/Api";

interface Props{
    open: boolean,
    onClose: () => void
} 

interface LaunchRequest{
    description?: string,
    categoryId?: number,
    value?: number,
    date?: Date;
}

export default function LaunchModal({open, onClose}: Props){
    const [launchData, setLaunchData] = useState<LaunchRequest>();
    const [launchDescription, setLaunchDescription] = useState<string>("");
    const [launchValue, setLaunchValue] = useState<number>();

    async function createLaunch(){
        const token = localStorage.getItem("token")
        try{
            const response = await api.post('/user/launches/create', launchData, {headers: {Authorization: `Bearer ${token}`}})
            const data = response.data
            console.log(data)
        }catch(error: any){
            console.log(error)
        }
    }

    if(!open) return null
    return  (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className=" bg-[#121821] rounded-2xl border border-white/10 p-6 w-1/3 h-2/3 flex flex-col">
                
                {/*HEADER*/}
                <div className="flex justify-between items-baseline">
                    <div>
                        <h2 className="text-xl mb-1.5">Novo lançamento</h2>
                        <p className="text-sm text-gray-400">Preencha os dados do lançamento</p>
                    </div>
                    <button onClick={onClose} className="cursor-pointer">X</button>
                </div>

                {/*FORMULÁRIO*/}
                <form className="grid grid-cols-2 gap-6 mt-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label>Tipo</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="border border-white/10 rounded-md cursor-pointer">Receita</button>
                            <button className="border border-white/10 rounded-md cursor-pointer">Despesa</button>
                        </div>
                    </div>
                    <div>
                        <label>Valor</label>
                        <div className="flex border border-white/10 rounded-md gap-1">
                            <div>R$</div>
                            <input type="number" value={launchValue} onChange={e => setLaunchValue(Number(e.target.value))}/>
                        </div>
                    </div>
                    <div>
                        <label>Categoria</label>
                        <div>
                            <select>
                                <option>Selecione uma categoria</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>Data</label>
                        <div>
                            <input type="date" className="border border-white/10 rounded-md w-full"/>
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col gap-2">
                        <label>Descrição</label>
                            <textarea placeholder="Ex.: Salário, Aluguel, Compra no mercado..." className="border border-white/10 rounded-md p-1" value={launchDescription} onChange={e => setLaunchDescription(e.target.value)}/>
                    </div>
                </form>

                {/*DICA*/}
                <div className="border border-white/10 rounded-md mt-10">
                    <h3>Dica</h3>
                    <p>Manter seus lançamentos organizados ajuda você a ter uma visão clara das suas finanças</p>
                </div>

                {/*BOTÕES*/}
                <div className="flex gap-2 justify-end items-end flex-1">
                    <button className="border border-white/10 rounded-md">Cancelar</button>
                    <button className="border border-white/10 rounded-md" onClick={() => createLaunch()}>Salvar lançamento</button>
                </div>

            </div>
        </div>
    )
}