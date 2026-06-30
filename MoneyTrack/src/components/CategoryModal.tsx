import type { Category } from "../types/LaunchesData";

interface Props{
    openModal: boolean,
    closeModal: () => void;
    deleteCategory: boolean;
    categoryData: Category | null;
}

export default function CategoryModal({openModal, closeModal, deleteCategory, categoryData}: Props){
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
                    <h3>Nova categoria</h3>
                    <p>Preencha as informações para criar uma nova categoria</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-7">
                    <div className="col-span-2 flex flex-col">
                            <label className="ml-1 mb-2">Nome da categoria</label>
                            <input type="text" placeholder="Ex.: Salário, Mercado, Transporte..." className="border border-white/10 rounded-lg p-1.5" value={categoryData?.name || ""}/>
                    </div>
                    <div className="flex flex-col">
                            <label className="mb-2">Tipo</label>
                            <div className="flex flex-col gap-3">
                                <button type="button" className="border border-white/10 rounded-md cursor-pointer p-1.5">Receita</button>
                                <button type="button" className="border border-white/10 rounded-md cursor-pointer p-1.5">Despesa</button>
                            </div>
                    </div>
                    <div className="border-2">
                            <label>Ícone</label>
                            <div>ícones</div>
                    </div>
                    <div className="border-2 col-span-2 flex flex-col">
                            <label>Cor</label>
                            <input type="color" name="" id="" />
                    </div>
                    <div className="border-2 col-span-2">prévia</div>
                </div>
                <div className="flex justify-end mt-auto gap-5">
                    <button className="border border-white/10 p-2 rounded-lg px-3 cursor-pointer" onClick={closeModal}>Cancelar</button>
                    <button className="border border-white/10 p-2 rounded-lg px-3 cursor-pointer bg-green-600">{categoryData != null ? "Editar categoria" : "Criar categoria"}</button>
                </div>
            </div>
        </div>
    )
}