import { useEffect, useState } from "react"
import Card from "../../components/Card"
import Sidebar from "../../components/Sidebar"
import api from "../../services/Api"
import type { launchesFilter, LaunchesData, Category } from "../../types/LaunchesData"
import { Pencil, Trash2 } from "lucide-react"
import { formatCurrency, formatedDate } from "../home/Home"

export default function Launches(){
    const [launchesData, setLaunchesData] = useState<LaunchesData>();
    const [filters, setFilters] = useState<launchesFilter>({initialDate: '2025-09-01', finalDate: '2025-09-30'}) //data inicial para teste, o setFilters vai ser com o filtro do backend
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        getLaunchesData(filters)
    }, [filters])

    useEffect(() => {
        getCategories()
    }, [filters.typeValue])

    async function getLaunchesData(filters: launchesFilter) {
        const token = localStorage.getItem("token")
        try{
            const response = await api.get<LaunchesData>("user/launches/data", {params: filters, headers: {Authorization: `Bearer ${token}`}})
            console.log(response.request)
            const data:LaunchesData = response.data
            console.log(data)
            setLaunchesData(data)
        }catch(error: any){
            console.log(error)
        }
    }

    async function getCategories(){ //deixar certinha de acordo com o filtro
        const token = localStorage.getItem("token");
        const typeValue = filters.typeValue;
        try{
            const response = await api.get("categories/filter", {params: typeValue ? {typeValue} : undefined,headers: {Authorization: `Bearer ${token}`}})
            const data = response.data
            console.log("categorias: " + data)
            console.log(typeValue)
            setCategories(data)
        }catch(error: any){
            console.log(error)
        }
    }

    function setFiltersCategory(event: React.ChangeEvent<HTMLSelectElement>){
        const typeValue = event.target.value;
        setFilters({...filters, typeValue: typeValue ? typeValue.toUpperCase() : undefined})
    }


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
                        <div>
                            <input type="date" value={filters.initialDate || ""} onChange={(e) => setFilters({...filters, initialDate: e.target.value})}/>
                            <input type="date" value={filters.finalDate || ""} onChange={(e) => setFilters({...filters, finalDate: e.target.value})}/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label>Tipo</label>
                        <select onChange={(e) => setFiltersCategory(e)}>
                            <option value="">Todos</option>
                            <option value="revenue">Receitas</option>
                            <option value="expense">Despesas</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label>Categoria</label>
                        <select>
                            {categories.map(category => (
                                <option key={category.id} className="bg-black">{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <input type="text" placeholder="Buscar lançamento"/>
                    </div>
                    <button>filtrar</button>                    
                </form>

                {/*CARDS*/}
                <div className="flex">
                    <Card title="Receitas" value={launchesData?.typeValues.revenue} formatValue ={true}/>
                    <Card title="Despesas" value={launchesData?.typeValues.expense} formatValue ={true}/>
                    <Card title="Saldo" value={launchesData?.totalValue} formatValue ={true}/>
                    <Card title="Total" value={launchesData?.totalLaunches} formatValue ={false}/> 
                </div>


                {/*ÁREA PRINCIPAL */}
                <div className="flex flex-1">

                {/*LANÇAMENTOS*/}
                    <div className="w-3/4 bg-[#121821] rounded-xl border border-white/10 mr-1">
                        <table className="w-full mt-3 table-fixed">
                            <thead>
                            <tr>
                                <th className="w-[18%] py-4 pl-4">Data</th>
                                <th className="w-[30%]">Descrição</th>
                                <th className="w-[25%]">Categoria</th>
                                <th className="w-[15%]">Tipo</th>
                                <th className="w-[18%]">Valor</th>
                                <th className="w-[8%]">Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {launchesData?.launches.map(launch => (
                                <tr key={launch.id} className="border border-white/5 hover:bg-white/10 transition">
                                <td className="py-4 pl-4 text-left">{formatedDate(launch.date)}</td>
                                <td>{launch.description}</td>
                                <td>{launch.category.name}</td>
                                {launch.category.typeValue == 'REVENUE' ? <td>Receita</td> : <td>Despesa</td>} 
                                <td>{formatCurrency(launch.value)}</td>
                                <td>
                                    <div className="flex gap-2.5">
                                        <Pencil/>
                                        <Trash2/>
                                    </div>
                                </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
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