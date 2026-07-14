import { useEffect, useState, type JSX } from "react";
import type { Category } from "../types/LaunchesData";
import { categoryIcons } from "../utils/CategoryIcon";
import { HelpCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/Api";
import { LoadingModal } from "./LoadingModal";

interface Props{
    openModal: boolean,
    closeModal: () => void;
    getCategories: () => Promise<void>,
    deleteCategory: boolean;
    categoryData: Category | null;
}


export default function CategoryModal({openModal, closeModal, deleteCategory, categoryData, getCategories}: Props){
    const[handleCategory, setHandleCategory] = useState<Partial<Category>>({})
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const IconComponent = (handleCategory?.icon && categoryIcons[handleCategory.icon]) || HelpCircle;
    
    useEffect(() => {
        if(categoryData){
            setHandleCategory(categoryData)
        }else {
            setHandleCategory({color:"#12b51d"})
        }
    },[categoryData])
    
    async function handleSaveCategory(){
        if(categoryData){
            await editCategoryFunction()
        }else{
            await handleCategoryFunction()
        }
    }

    async function handleCategoryFunction(){
        if(handleCategory.name == null || handleCategory.name == ""){
            toast.error("Por favor, adicione um nome a sua nova categoria")
        }
        if(handleCategory.typeValue == null){
            toast.error("Por favor, escolha um tipo de categoria")
        }

        if(handleCategory.icon == null){
            setHandleCategory(prev => ({...prev, icon: "helpCircle"}))
        }

        const token = localStorage.getItem("token")
        try{
            setIsVisible(true)
            await api.post("/categories/create",handleCategory, {headers: {Authorization: `Bearer ${token}`}})
            await getCategories()
            closeModal()
            toast.success("Categoria criada com sucesso")
            setHandleCategory({})
        }catch(error: any){
            if(error.response?.data?.message){
                toast.error(error.response?.data?.message)
            }else{
                toast.error("Erro interno. Por favor, tentar novamente mais tarde") 
            }
        }finally{
            setIsVisible(false)
        }
    }

    async function editCategoryFunction(){
        if(handleCategory.name == null || handleCategory.name == ""){
            toast.error("Por favor, adicione um nome a sua nova categoria")
        }
        if(handleCategory.typeValue == null){
            toast.error("Por favor, escolha um tipo de categoria")
        }

        if(handleCategory.icon == null){
            setHandleCategory(prev => ({...prev, icon: "helpCircle"}))
        }
        const token = localStorage.getItem("token");

        try{
            setIsVisible(true)
            await api.put(`/categories/update/${categoryData?.id}`, handleCategory, {headers: {Authorization: `Bearer ${token}`}})
            await getCategories()
            closeModal()
            toast.success("Categoria editada com sucesso")
            setHandleCategory({})
        }catch(error: any){
            if(error.response?.data?.message){
                toast.error(error.response?.data?.message)
            }else{
                toast.error("Erro interno. Por favor, tentar novamente mais tarde") 
            }
        }finally{
            setIsVisible(false)
        }
    }

    async function deleteCategoryFunction(){
        const token = localStorage.getItem("token")
        try{
            setIsVisible(true)
            await api.delete(`/categories/delete/${handleCategory.id}`, {headers: {Authorization: `Bearer ${token}`}})
            await getCategories()
            closeModal()
            toast.success("Categoria deletada com sucesso")
            setHandleCategory({})
        }catch(error:any){
            if(error.response?.data?.message){
                toast.error(error.response?.data?.message)
            }else{
                toast.error("Erro interno. Por favor, tentar novamente mais tarde") 
            }
        }finally{
            setIsVisible(false)
        }
    }

    const typeBadges: Record<string, JSX.Element> = {
    REVENUE: <span className="bg-green-950 p-1 px-2.5 text-green-400 rounded-md">Receita</span>,
    EXPENSE: <span className="bg-red-950 p-1 px-2.5 text-red-400 rounded-md">Despesa</span>,
};

    if(!openModal) return;

    if(deleteCategory) return(
       <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className=" bg-[#121821] rounded-2xl border border-white/10 p-6 w-1/4 h-2/5 flex flex-col items-center justify-around">
                <div className="flex flex-col items-center gap-3">
                    <h2 className="text-3xl">Deletar Categoria</h2>
                    <p className="text-gray-400 text-center">Tem certeza que deseja deletar esta categoria? <br/>Essa ação não pode ser desfeita.</p>     
                </div>
                <div className="gap-2.5 flex">
                    <button className="border border-white/10 px-2.5 py-2.5 rounded-sm cursor-pointer" onClick={closeModal}>Cancelar</button>
                    <button className="border border-white/10 px-2.5 py-2.5 rounded-sm cursor-pointer bg-red-600" onClick={deleteCategoryFunction}>Deletar categoria</button>
                </div>
            </div>
            <LoadingModal isVisible={isVisible}/>
        </div>
    )

    return(
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className=" bg-[#121821] rounded-2xl border border-white/10 p-6 w-1/3 h-3/4 flex flex-col">
                <div>
                    <h3 className="text-2xl">Nova categoria</h3>
                    <p className="text-gray-400">Preencha as informações para criar uma nova categoria</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-7">
                    <div className="col-span-2 flex flex-col">
                            <label className="ml-1 mb-2">Nome da categoria</label>
                            <input type="text" placeholder="Ex.: Salário, Mercado, Transporte..." className="border border-white/10 rounded-lg p-1.5" value={handleCategory?.name || ""} onChange={e => setHandleCategory(prev => ({...prev, name:e.target.value}))}/>
                    </div>
                    <div className="flex flex-col">
                            <label className="mb-2">Tipo</label>
                            <div className="flex flex-col gap-3">
                                <button type="button" className={`border border-white/10 rounded-md cursor-pointer p-2 ${handleCategory?.typeValue === "REVENUE" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-medium" : "border-white/10 text-gray-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-400"}}`} onClick={() => setHandleCategory(prev => ({...prev, typeValue: "REVENUE"}))}>Receita</button>
                                <button type="button" className={`border border-white/10 rounded-md cursor-pointer p-2 ${handleCategory?.typeValue === "EXPENSE" ? "bg-red-500/20 border-red-500 text-red-400 font-medium" : "border-white/10 text-gray-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400"}`} onClick={() => setHandleCategory(prev => ({...prev,typeValue: "EXPENSE"}))}>Despesa</button>
                            </div>
                    </div>
                    <div>
                            <label>Ícone</label>
                            <div className="grid grid-cols-6 gap-3 max-h-30 overflow-y-auto p-2 bg-[#121821] rounded-lg border border-white/10">
                                {Object.keys(categoryIcons).map(icon => {
                                    const IconComponent = categoryIcons[icon]
                                    const isSelected = handleCategory?.icon === icon

                                    return(
                                        <button key={icon} className={`cursor-pointer hover:bg-[#0a0d13] flex justify-center rounded-full p-1 ${isSelected ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white"}`} onClick={() => setHandleCategory(prev => ({...prev,icon:icon}))}><IconComponent/></button>
                                    )
                                })}
                            </div>
                    </div>
                    <div className="col-span-2 flex flex-col">
                        <label className="mb-1.5">Cor</label>
                        <div className="border border-white/10 rounded-lg p-2.5 flex items-center gap-3">
                                <input 
                                    type="color" value={handleCategory?.color} onChange={(e) => setHandleCategory(prev => ({...prev, color: e.target.value}))} className="w-8 h-8 cursor-pointer bg-transparent border-0 p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-md [&::-moz-color-swatch]:border-none[::-moz-color-swatch]:rounded-md"/>
                                <p className="text-gray-400 font-medium text-sm tracking-wide">{(handleCategory?.color?.toUpperCase())}</p>
                        </div>
                    </div>
                    <div className="border border-white/10 col-span-2 bg-[#121821] flex items-center gap-1.5 p-3 rounded-lg">
                        <div className="border p-4 rounded-full mr-3" style={{borderColor:handleCategory?.color, backgroundColor:`${handleCategory?.color}15`,color:handleCategory.color}}><IconComponent/></div>
                        <div>
                            <h3 className="text-1x1 text-gray-400">Prévia da categoria</h3>
                            <div className="flex items-center mt-1.5">
                                <p className="text-[20px] mr-5">{handleCategory?.name ? handleCategory.name : "Nome"}</p>
                                {typeBadges[handleCategory?.typeValue || ""] || <span className="bg-gray-950 p-1 px-2.5 text-gray-400 rounded-md">Tipo</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-auto gap-5">
                    <button className="border border-white/10 p-2 rounded-lg px-3 cursor-pointer" onClick={() => {closeModal() ; setHandleCategory({})}}>Cancelar</button>
                    <button className="border border-white/10 p-2 rounded-lg px-3 cursor-pointer bg-green-600" onClick={handleSaveCategory}>{categoryData != null ? "Editar categoria" : "Criar categoria"}</button>
                </div>
            </div>
            <LoadingModal isVisible={isVisible}/>
        </div>
    )
}