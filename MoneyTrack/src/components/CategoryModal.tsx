interface Props{
    openModal: boolean,
    closeModal: () => void;
}

export default function CategoryModal({openModal, closeModal}: Props){
    if(!openModal) return;

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
                            <input type="text" placeholder="Ex.: Salário, Mercado, Transporte..." className="border border-white/10 rounded-lg p-1.5"/>
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
                    <button className="border border-white/10 p-2 rounded-lg px-3 cursor-pointer bg-green-600">Criar categoria</button>
                </div>
            </div>
        </div>
    )
}