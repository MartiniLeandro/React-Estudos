import { useEffect, useState } from "react";
import api from "../services/Api";
import { getCategories } from "../pages/launches/Launches";
import type { Category, Launch, launchesFilter } from "../types/LaunchesData";

interface Props{
    open: boolean,
    onClose: () => void,
    launch: Launch | null,
    getLaunches: () => Promise<void>,
    deleteModal: boolean
} 

interface LaunchRequest{
    description?: string,
    categoryId?: number,
    value?: number,
    date?: string;
}

interface LaunchResponse{
    description?: string,
    categoryId?: number,
    value?: number,
    date?: string;
}

export default function LaunchModal({open, onClose, launch, getLaunches, deleteModal}: Props){
    const [launchData, setLaunchData] = useState<LaunchRequest>({});
    const [filters, setFilters] = useState<launchesFilter>({})
    const [categories, setCategories] = useState<Category[]>();
    
    useEffect(() => {
        getCategories(filters,setCategories)
    }, [filters.typeValue])

    useEffect(() => {
        if(launch){
            setLaunchData({description: launch.description, value:launch.value, date: launch.date, categoryId: launch.category.id})
        }else{
            setLaunchData({})
        }
    }, [launch])

    async function handleSaveLaunch(){
        if(launch){
            await editLaunch()
        }else{
            await createLaunch()
        }
    }

    async function createLaunch(){
        const token = localStorage.getItem("token")
        try{
            const response = await api.post<LaunchResponse>('/user/launches/create', launchData, {headers: {Authorization: `Bearer ${token}`}})
            const data = response.data
            console.log(data)
            await getLaunches()
            onClose()
            alert("Lançamento criado")
        }catch(error: any){
            console.log(error)
        }finally{
            console.log(launchData)
        }
    }

    async function editLaunch(){
        const token = localStorage.getItem("token")
        console.log(launchData)
        try{
            const response = await api.put<LaunchResponse>(`/user/launches/update/${launch?.id}`,launchData, {headers: {Authorization: `Bearer ${token}`}})
            const data = response.data;
            console.log(data)
            await getLaunches()
            onClose()
            alert("Lançamento editado")
        }catch(error: any){
            console.log(error.response.data)
        }
    }

    async function deleteLaunch(){

        if(!launch){
            return
        }

        const token = localStorage.getItem("token")
        try{
            const response = await api.delete(`user/launches/delete/${launch?.id}`, {headers: {Authorization: `Bearer ${token}`}})
            const data = response.data;
            console.log(data)
            await getLaunches()
            onClose()
            alert("Lançamento deletado")
        }catch(error: any){
            console.log(error.response.data)
        }
    }

    if(!open) return null

    if(deleteModal) return (
         <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className=" bg-[#121821] rounded-2xl border border-white/10 p-6 w-1/4 h-2/5 flex flex-col items-center justify-around">
                <div className="flex flex-col items-center gap-3">
                    <h2 className="text-3xl">Deletar lançamento</h2>
                    <p className="text-gray-400 text-center">Tem certeza que deseja deletar este lançamento? <br/>Essa ação não pode ser desfeita.</p>     
                </div>
                <div className="gap-2.5 flex">
                    <button className="border border-white/10 px-2.5 py-2.5 rounded-sm cursor-pointer" onClick={onClose}>Cancelar</button>
                    <button className="border border-white/10 px-2.5 py-2.5 rounded-sm cursor-pointer bg-red-600" onClick={deleteLaunch}>Deletar lançamento</button>
                </div>
            </div>
        </div>
    )
    return  (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className=" bg-[#121821] rounded-2xl border border-white/10 p-6 w-1/3 h-2/3 flex flex-col">
                
                {/*HEADER*/}
                <div className="flex justify-between items-baseline">
                    <div>
                        <h2 className="text-xl mb-1.5">Novo lançamento</h2>
                        <p className="text-sm text-gray-400">Preencha os dados do lançamento</p>
                    </div>
                    <button onClick={() => {
                        onClose()
                        setLaunchData({})   
                    }} className="cursor-pointer">X</button>
                </div>

                {/*FORMULÁRIO*/}
                <form className="grid grid-cols-2 gap-6 mt-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label>Tipo</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button type="button" className="border border-white/10 rounded-md cursor-pointer" onClick={() => setFilters({...filters, typeValue: "REVENUE"})}>Receita</button>
                            <button type="button" className="border border-white/10 rounded-md cursor-pointer" onClick={() => setFilters({...filters, typeValue: "EXPENSE"})}>Despesa</button>
                        </div>
                    </div>
                    <div>
                        <label>Valor</label>
                        <div className="flex border border-white/10 rounded-md gap-1">
                            <div>R$</div>
                            <input type="number" value={launchData.value || ''} onChange={e => setLaunchData(prev => ({...prev, value: Number(e.target.value)}))}/>
                        </div>
                    </div>
                    <div>
                        <label>Categoria</label>
                        <div>
                            <select value={launchData.categoryId || ""} onChange={(e) => setLaunchData(prev => ({...prev, categoryId: Number(e.target.value)}))}>
                                <option value="" className="bg-black">Selecione uma categoria</option>
                                 {categories?.map(category => (
                                <option key={category.id} className="bg-black" value={category.id}>{category.name}</option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>Data</label>
                        <div>
                            <input type="date" value={launchData.date != null ? launchData.date : ""} className="border border-white/10 rounded-md w-full" onChange={(e) => setLaunchData(prev => ({...prev, date:e.target.value}))}/>
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col gap-2">
                        <label>Descrição</label>
                            <textarea placeholder="Ex.: Salário, Aluguel, Compra no mercado..." className="border border-white/10 rounded-md p-1" value={launchData.description || ""} onChange={e => setLaunchData(prev => ({...prev, description:e.target.value}))}/>
                    </div>
                </form>

                {/*DICA*/}
                <div className="border border-white/10 rounded-md mt-10">
                    <h3>Dica</h3>
                    <p>Manter seus lançamentos organizados ajuda você a ter uma visão clara das suas finanças</p>
                </div>

                {/*BOTÕES*/}
                <div className="flex gap-2 justify-end items-end flex-1">
                    <button type="button" className="border border-white/10 rounded-md" onClick={onClose}>Cancelar</button>
                    <button type="button" className="border border-white/10 rounded-md" onClick={handleSaveLaunch}>Salvar lançamento</button>
                </div>

            </div>
        </div>
    )
}