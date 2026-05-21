
interface Props{
    open: boolean,
    onClose: () => void
} 

export default function LaunchModal({open, onClose}: Props){

    if(!open) return null
    return  (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className=" bg-[#121821] rounded-2xl border border-white/10 p-6 w-1/3 h-2/3">
                
                {/*HEADER*/}
                <div className="flex justify-between items-baseline">
                    <div>
                        <h2 className="text-xl mb-1.5">Novo lançamento</h2>
                        <p className="text-sm text-gray-400">Preencha os dados do lançamento</p>
                    </div>
                    <button onClick={onClose} className="cursor-pointer">X</button>
                </div>

                {/*FORMULÁRIO*/}
                <form className="w-full h-full border border-white mt-10">
                
                </form>


            </div>
        </div>
    )
}