import { useEffect, useState } from "react";
import api from "../services/Api";
import { getCategories } from "../pages/launches/Launches";
import type { Category, Launch, launchesFilter } from "../types/LaunchesData";
import toast from "react-hot-toast";
import { ChevronDown, Lightbulb } from "lucide-react";

interface Props{
    open: boolean,
    onClose: () => void,
    launch: Launch | null,
    getLaunches: () => Promise<void>,
    deleteModal: boolean,
    exportLaunches: boolean,
    launchesFilter: launchesFilter;
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

export default function LaunchModal({open, onClose, launch, getLaunches, deleteModal, exportLaunches, launchesFilter}: Props){
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

    function launchIsValid(launch:LaunchRequest):boolean{
        if(!launch.value || launch.value <= 0){
            toast.error("O valor deve ser maior que zero.");
            return false;
        }
        
        if(!launch.categoryId){
            toast.error("Por favor, selecione uma categoria.");
            return false;
        }
        
        if(!launch.date){
            toast.error("Por favor, informe a data do lançamento.");
            return false;
        }

        if(!launch.description || launch.description.trim() === ""){
            toast.error("A descrição do lançamento é obrigatória.");
            return false;
        }
        return true;
    }

    async function createLaunch(){

        if(!launchIsValid(launchData)){
            return;
        }
        
        const token = localStorage.getItem("token")
        try{
            await api.post<LaunchResponse>('/user/launches/create', launchData, {headers: {Authorization: `Bearer ${token}`}})
            await getLaunches()
            onClose()
            toast.success("Lançamento criado com sucesso")
            setLaunchData({})
        }catch(error: any){
            if(error.response?.data?.message){
                toast.error(error.response.data.message)
            }else{
                toast.error("Erro interno. Por favor, tentar novamente mais tarde") 
            }
        }
    }

    async function editLaunch(){

        if(!launchIsValid(launchData)){
            return;
        }

        const token = localStorage.getItem("token")
        try{
            await api.put<LaunchResponse>(`/user/launches/update/${launch?.id}`,launchData, {headers: {Authorization: `Bearer ${token}`}})
            await getLaunches()
            onClose()
            toast.success("Lançamento editado com sucesso")
        }catch(error: any){
            if(error.response?.data?.message){
                toast.error(error.response.data.message)
            }else{
                toast.error("Erro interno. Por favor, tentar novamente mais tarde") 
            }
        }
    }

    async function deleteLaunch(){

        if(!launch){
            return
        }

        const token = localStorage.getItem("token")
        try{
            await api.delete(`user/launches/delete/${launch?.id}`, {headers: {Authorization: `Bearer ${token}`}})
            await getLaunches()
            onClose()
            toast.success("Lançamento excluido com sucesso")
        }catch(error: any){
            console.log(error.response.data)
        }
    }

    async function exportLaunchesFunction(){
        const token = localStorage.getItem("token");
        try{
            const response = await api.get("user/launches/export", {params: launchesFilter ,responseType: 'blob' ,headers: {Authorization: `Bearer ${token}`}})
            const blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
            const urlTemporaria = window.URL.createObjectURL(blob);

            const linkInvisivel = document.createElement('a');
            linkInvisivel.href = urlTemporaria;
        
            linkInvisivel.setAttribute('download', 'extrato_moneyTrack.xlsx'); 
        
            document.body.appendChild(linkInvisivel);
            linkInvisivel.click();
            document.body.removeChild(linkInvisivel);

            window.URL.revokeObjectURL(urlTemporaria);
            onClose()
            
            toast.success("Lançamentos exportados com sucesso")

        }catch(error:any){
            toast.error("Não foi possível gerar o arquivo. Tente novamente")
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

    if(exportLaunches) return (
                 <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className=" bg-[#121821] rounded-2xl border border-white/10 p-6 w-1/4 h-2/5 flex flex-col items-center justify-around">
                <div className="flex flex-col items-center gap-3">
                    <h2 className="text-3xl">Exportar lançamentos</h2>
                    <p className="text-gray-400 text-center">Tem certeza que deseja exportar estes lançamentos? <br/>Obs: Será baixado um arquivo excel</p>     
                </div>
                <div className="gap-2.5 flex">
                    <button className="border border-white/10 px-2.5 py-2.5 rounded-sm cursor-pointer" onClick={onClose}>Cancelar</button>
                    <button className="border border-white/10 px-2.5 py-2.5 rounded-sm cursor-pointer bg-emerald-500/70" onClick={exportLaunchesFunction}>Exportar lançamentos</button>
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
                        setFilters({})
                    }} className="cursor-pointer">X</button>
                </div>

                {/*FORMULÁRIO*/}
                <form className="grid grid-cols-2 gap-6 mt-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label>Tipo</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button type="button" className={`border border-white/10 rounded-md cursor-pointer p-2 ${filters.typeValue === "REVENUE" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-medium" : "border-white/10 text-gray-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-400"}}`} onClick={() => setFilters({...filters, typeValue: "REVENUE"})}>Receita</button>
                            <button type="button" className={`border border-white/10 rounded-md cursor-pointer ${filters.typeValue === "EXPENSE" ? "bg-red-500/20 border-red-500 text-red-400 font-medium" : "border-white/10 text-gray-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400"}`} onClick={() => setFilters({...filters, typeValue: "EXPENSE"})}>Despesa</button>
                        </div>
                    </div>
                    <div>
                        <label>Valor</label>
                        <div className="flex border border-white/10 rounded-md gap-2 p-2">
                            <div>R$</div>
                            <input type="number" value={launchData.value || ''} onChange={e => setLaunchData(prev => ({...prev, value: Number(e.target.value)}))} placeholder="0,00" className="bg-transparent focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/*Estilo para tirar as bordar e icones padrões do input*//>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm">Categoria</label>
                        <div className="relative">
                            <select 
                                value={launchData.categoryId || ""} onChange={(e) => setLaunchData(prev => ({...prev, categoryId: Number(e.target.value)}))} className="w-full appearance-none bg-transparent border border-white/10 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-0 cursor-pointer">
                                <option value="" className="bg-[#121821] text-gray-400">Selecione uma categoria</option>
                                {categories?.map(category => (
                                    <option key={category.id} className="bg-[#121821]" value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <ChevronDown size={18} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm mb-2 block">Data</label>
                        <div>
                            <input type="date" value={launchData.date || ""} onChange={(e) => setLaunchData(prev => ({...prev, date:e.target.value}))} className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-0" />
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col gap-2">
                        <label className="text-sm">Descrição</label>
                        <textarea placeholder="Ex.: Salário, Aluguel, Compra no mercado..." value={launchData.description || ""} onChange={e => setLaunchData(prev => ({...prev, description:e.target.value}))} rows={3} className="w-full bg-transparent border border-white/10 rounded-md px-3 py-2 resize-none focus:outline-none focus:border-emerald-500 focus:ring-0"/>
                    </div>
                </form>

                {/*DICA*/}
                <div className="border border-white/10 rounded-md mt-10 flex gap-3">
                    <div className="flex items-center rounded-full w-10 h-10 justify-center bg-emerald-500/10 text-emerald-500 m-2.5"><Lightbulb/></div>
                    <div className="flex flex-col">
                        <h3 className="text-xl mb-1.5">Dica</h3>
                        <p className="text-sm text-gray-400">Manter seus lançamentos organizados ajuda você a ter uma visão clara das suas finanças</p>
                    </div>
                </div>

                {/*BOTÕES*/}
                <div className="flex gap-2 justify-end items-end flex-1">
                    <button type="button" className="border border-white/10 rounded-md p-2.5 cursor-pointer hover:bg-black/50" onClick={onClose}>Cancelar</button>
                    <button type="button" className="border border-white/10 rounded-md p-2.5 cursor-pointer bg-green-600 hover:bg-green-700" onClick={handleSaveLaunch}>Salvar lançamento</button>
                </div>

            </div>
        </div>
    )
}