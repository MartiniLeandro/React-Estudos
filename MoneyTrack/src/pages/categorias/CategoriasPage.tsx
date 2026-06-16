import CategoryCard from "../../components/CategoryCard"
import Sidebar from "../../components/Sidebar"

export default function Categorias(){
    return(
        <div className="flex w-full h-screen">

            {/*SIDEBAR*/}
            <Sidebar/>

            {/*CONTEUDO PRINCIPAL*/}
            <div className="flex-1 bg-[#0B0F14] flex flex-col p-8 gap-1.5">
                
                {/*HEADER*/}
                <header className="flex justify-between items-center mb-5">
                    <div>
                        <h2 className="font-bold text-2xl">Categorias</h2>
                        <p className="text-gray-400">Visualize e gerencia todas as categorias disponíveis no sistema.</p>
                    </div>
                    <div>
                        <button className="bg-green-600 p-3 rounded-md cursor-pointer">+ Nova categoria</button>
                    </div>
                </header>

                {/*CARD*/}
                <CategoryCard/>

                {/*FILTROS*/}
                <div className="flex justify-between mt-3.5">
                    <input type="text" placeholder="Buscar categoria..."/>
                    <select>
                        <option value="">Todas as opções</option>
                    </select>
                </div>

            </div>
        </div>
    )
}