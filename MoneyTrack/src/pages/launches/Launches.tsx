import Card from "../../components/Card"
import Sidebar from "../../components/Sidebar"

export default function Launches(){
    return(
        <div className="flex w-full h-screen">
            
            {/*SIDEBAR*/}
            <Sidebar/>

            {/*CONTEUDO PRINCIPAL*/}
            <div className="flex-1 bg-[#0B0F14] flex flex-col p-8 gap-1.5">

                {/*HEADER*/}
                <header className="flex justify-between">
                    <div>
                        <h2 className="font-bold text-2xl">Lançamentos</h2>
                        <p className="text-gray-400">Gerencia seus lançamentos financeiros</p>
                    </div>
                    <div>
                        <button className="border-2 mr-4 p-1.5">Exportar</button>
                        <button className="border-2 p-1.5">+ Novo lançamento</button>
                    </div>
                </header>

                {/*FILTROS*/}
                <form className="flex bg-[#121821] rounded-xl border border-white/10 mt-6 justify-between items-center p-2.5 m-1">
                    <div className="flex flex-col">
                        <label>Período</label>
                        <input type="date"/>
                    </div>
                    <div className="flex flex-col">
                        <label>Tipo</label>
                        <select>
                            <option>Todos</option>
                            <option value="revenue">Receitas</option>
                            <option value="expense">Despesas</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label>Categoria</label>
                        <select>
                            <option>Todas as categorias</option>
                            <option>Categoria 2</option>
                            <option>Categoria 3</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <input type="text" placeholder="Buscar lançamento"/>
                    </div>
                    <button>filtrar</button>                    
                </form>

                {/*CARDS*/}
                <div className="flex">
                    <Card title="Receitas"/>
                    <Card title="Despesas"/>
                    <Card title="Saldo"/>
                    <Card title="Total"/>
                </div>


                {/*ÁREA PRINCIPAL */}
                <div className="flex flex-1">

                {/*LANÇAMENTOS*/}
                    <div className="w-3/4 mr-2.5 bg-[#121821] rounded-xl border border-white/10 p-2.5 m-1">
                        <p>teste</p>
                    </div>

                {/*GRÁFICOS*/}
                    <div className="w-1/4 flex flex-col">
                        <div className="flex-1 bg-[#121821] rounded-xl border border-white/10 p-2.5 m-1">
                            <p>gráfico 1</p>
                        </div>
                        <div className="flex-1 bg-[#121821] rounded-xl border border-white/10 p-2.5 m-1">
                            <p>gráfico 2</p>
                        </div>
                    </div>

                </div >
            </div>
        </div>
    )
}