import { useEffect, useState } from "react";
import type { Category } from "../types/LaunchesData";
import { categoryIcons } from "../utils/CategoryIcon";

interface Props{
    openModal: boolean,
    closeModal: () => void;
    deleteCategory: boolean;
    categoryData: Category | null;
}


export default function CategoryModal({openModal, closeModal, deleteCategory, categoryData}: Props){
    const[createCategory, setCreatedCategory] = useState<Partial<Category>>()
    
    useEffect(() => {
        if(categoryData){
            setCreatedCategory({...categoryData})
        }else {
            setCreatedCategory({})
        }
    },[categoryData])

    useEffect(() => {
        console.log(createCategory)
    },[createCategory])

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
                    <button className="border border-white/10 px-2.5 py-2.5 rounded-sm cursor-pointer bg-red-600">Deletar categoria</button>
                </div>
            </div>
        </div>
    )

    return(
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className=" bg-[#121821] rounded-2xl border border-white/10 p-6 w-1/3 h-2/3 flex flex-col">
                <div>
                    <h3 className="text-2xl">Nova categoria</h3>
                    <p className="text-gray-400">Preencha as informações para criar uma nova categoria</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-7">
                    <div className="col-span-2 flex flex-col">
                            <label className="ml-1 mb-2">Nome da categoria</label>
                            <input type="text" placeholder="Ex.: Salário, Mercado, Transporte..." className="border border-white/10 rounded-lg p-1.5" value={createCategory?.name} onChange={e => setCreatedCategory(prev => ({...prev, name:e.target.value}))}/>
                    </div>
                    <div className="flex flex-col">
                            <label className="mb-2">Tipo</label>
                            <div className="flex flex-col gap-3">
                                <button type="button" className={`border border-white/10 rounded-md cursor-pointer p-2 ${createCategory?.typeValue === "REVENUE" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 font-medium" : "border-white/10 text-gray-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-400"}}`} onClick={() => setCreatedCategory(prev => ({...prev, typeValue: "REVENUE"}))}>Receita</button>
                                <button type="button" className={`border border-white/10 rounded-md cursor-pointer p-2 ${createCategory?.typeValue === "EXPENSE" ? "bg-red-500/20 border-red-500 text-red-400 font-medium" : "border-white/10 text-gray-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400"}`} onClick={() => setCreatedCategory(prev => ({...prev,typeValue: "EXPENSE"}))}>Despesa</button>
                            </div>
                    </div>
                    <div>
                            <label>Ícone</label>
                            <div className="grid grid-cols-6 gap-3 max-h-30 overflow-y-auto p-2 bg-[#121821] rounded-lg border border-white/10">
                                {Object.keys(categoryIcons).map(icon => {
                                    const IconComponent = categoryIcons[icon]
                                    const isSelected = createCategory?.icon === icon

                                    return(
                                        <button key={icon} className={`cursor-pointer hover:bg-[#0a0d13] flex justify-center rounded-full p-1 ${isSelected ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white"}`} onClick={() => setCreatedCategory(prev => ({...prev,icon:icon}))}><IconComponent/></button>
                                    )
                                })}
                            </div>
                    </div>
                    <div className="border-2 col-span-2 flex flex-col">
                            <label>Cor</label>
                            <input type="color" name="" id="" />
                    </div>
                    <div className="border-2 col-span-2 ">
                        prévia
                    </div>
                </div>
                <div className="flex justify-end mt-auto gap-5">
                    <button className="border border-white/10 p-2 rounded-lg px-3 cursor-pointer" onClick={closeModal}>Cancelar</button>
                    <button className="border border-white/10 p-2 rounded-lg px-3 cursor-pointer bg-green-600">{categoryData != null ? "Editar categoria" : "Criar categoria"}</button>
                </div>
            </div>
        </div>
    )
}