import { useEffect, useState } from "react"
import Card from "../../components/Card"
import Sidebar from "../../components/Sidebar"
import api from "../../services/Api"
import type { launchesFilter, LaunchesData, Category, Launch} from "../../types/LaunchesData"
import { ArrowDown, ArrowUp, Download, Equal, FileText, Pencil, Search, Trash2} from "lucide-react"
import { formatCurrency, formatedDate } from "../home/Home"
import { categoryIcons } from "../../utils/CategoryIcon"
import LaunchModal from "../../components/LaunchModal"

export default function Launches(){
    const [launchesData, setLaunchesData] = useState<LaunchesData>();
    const [filters, setFilters] = useState<launchesFilter>({initialDate: '2026-06-01', finalDate: '2026-06-30'})
    const [categories, setCategories] = useState<Category[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [launchData, setLaunchData] = useState<Launch | null>(null)
    const [searchDescription, setSearchDescription] = useState<string>("")

    useEffect(() => {
        getLaunchesData(filters)
    }, [filters])

    useEffect(() => {
        getLaunchesData(filters)
    }, [launchData])

    useEffect(() => {
        getCategories(filters, setCategories)
    }, [filters.typeValue])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilters(prevFilters => ({...prevFilters, description: searchDescription}))
        },500)
        return () => clearTimeout(delayDebounceFn)
    }, [searchDescription])

    async function getLaunchesData(filters: launchesFilter) {
        const token = localStorage.getItem("token")
        filters.categoryId = filters.categoryId == 0 ? undefined : filters.categoryId
        try{
            const response = await api.get<LaunchesData>("user/launches/data", {params: filters, headers: {Authorization: `Bearer ${token}`}})
            const data:LaunchesData = response.data;
            setLaunchesData(data)
        }catch(error: any){
            console.log(error)
        }
    }

    function handleCloseModal(){
        if(deleteModal){
            setDeleteModal(false)
        }
        setOpenModal(false)
        setLaunchData(null)
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
                    <div className="flex h-12">
                        <button className="border border-white/10 rounded-md mr-4 p-1.5"> 
                            <div className="flex gap-2.5 cursor-pointer">
                                <Download className="text-green-400"/>
                                <span>Exportar</span>
                            </div>
                         </button>
                        <button className="bg-green-600 px-2.5 rounded-md cursor-pointer" onClick={() => setOpenModal(true)}>+ Novo lançamento</button>
                    </div>
                </header>

                {/*FILTROS*/}
                <form className="flex bg-[#121821] rounded-xl border border-white/10 mt-6 justify-between items-center p-2.5 m-1" onSubmit={(e) => e.preventDefault}>
                    <div className="flex flex-col">
                        <label>Período</label>
                        <div className="bg-gray-950 p-1 rounded-md border border-white/10">
                            <input type="date" value={filters.initialDate || ""} onChange={(e) => setFilters({...filters, initialDate: e.target.value})} className="mr-2"/>
                            <input type="date" value={filters.finalDate || ""} onChange={(e) => setFilters({...filters, finalDate: e.target.value})}/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label>Tipo</label>
                        <select onChange={(e) => setFiltersCategory(e)} className="bg-gray-950 p-1 rounded-md border border-white/10">
                            <option value="">Todos</option>
                            <option value="revenue">Receitas</option>
                            <option value="expense">Despesas</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label>Categoria</label>
                        <select onChange={(e) => setFilters({...filters, categoryId: Number(e.target.value)})} className="bg-gray-950 p-1 rounded-md border border-white/10">
                            <option value={0}>Todas as categorias</option>
                            {categories.map(category => (
                                <option key={category.id} className="bg-black" value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end justify-end bg-gray-950 p-1 rounded-md border border-white/10 mt-3.5">
                        <input type="text" placeholder="Buscar lançamento" value={searchDescription} onChange={(e) => setSearchDescription(e.target.value)}/>
                        <Search/>
                    </div>              
                </form>

                {/*CARDS*/}
                <div className="flex">
                    <Card title="Receitas" value={launchesData?.typeValues.revenue} formatValue ={true} iconLaunchPage={{icon: ArrowUp, bgColor: "bg-emerald-500/10", color: "text-emerald-500"}}/>
                    <Card title="Despesas" value={launchesData?.typeValues.expense} formatValue ={true} iconLaunchPage={{icon: ArrowDown, bgColor: "bg-rose-500/10", color: "text-rose-500"}}/>
                    <Card title="Saldo Total" value={launchesData?.totalValue} formatValue ={true} iconLaunchPage={{icon: Equal, bgColor: "bg-amber-500/10", color: "text-amber-500"}}/>
                    <Card title="Qntd. Lançamentos" value={launchesData?.totalLaunches} formatValue ={false} iconLaunchPage={{icon: FileText, bgColor: "bg-blue-500/10", color: "text-blue-500"}}/> 
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
                            {launchesData?.launches.map(launch => {
                                const Icon = categoryIcons[launch.category.icon];

                                return(
                                <tr key={launch.id} className="border border-white/5 hover:bg-white/10 transition">
                                <td className="py-4 pl-4 text-left">{formatedDate(launch.date)}</td>
                                <td>{launch.description}</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        {Icon && <div className="p-0.5 border rounded-full" style={{borderColor: launch.category.color, backgroundColor: `${launch.category.color}15`}}><Icon style={{color: launch.category.color}}/></div>}
                                        <span>{launch.category.name}</span>
                                    </div>
                                    </td>
                                {launch.category.typeValue == 'REVENUE' ? <td><span className="bg-green-950 p-1 text-green-400 rounded-md">Receita</span></td> : 
                                <td><span className="bg-red-950 p-1 text-red-400 rounded-md">Despesa</span></td>} 
                                <td style={launch.category.typeValue == "REVENUE" ? {color: "green"} : {color: "red"}} className="font-bold">{formatCurrency(launch.value)}</td>
                                <td>
                                    <div className="flex gap-2.5">
                                        <Pencil className="text-gray-200 cursor-pointer" onClick={() => {
                                            setOpenModal(true)
                                            setLaunchData(launch)
                                        }}/>
                                        <Trash2 className="text-gray-200 cursor-pointer" onClick={() => {
                                            setDeleteModal(true)
                                            setOpenModal(true)
                                            setLaunchData(launch)
                                            }}/>
                                    </div>
                                </td>
                                </tr>
                                )})}
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

                {/*MODAL DE CRIAR E EXCLUIR LANÇAMENTO*/}
                <LaunchModal open={openModal} onClose={handleCloseModal} launch={launchData} getLaunches={() => getLaunchesData(filters)} deleteModal={deleteModal}/>         
            
                </div >
            </div>
        </div>
    )
}

    export async function getCategories(filters: launchesFilter, setCategories: any ){
        const token = localStorage.getItem("token");
        const typeValue = filters.typeValue;
        try{
            const response = await api.get<Category[]>("categories/filter", {params: typeValue ? {typeValue} : undefined,headers: {Authorization: `Bearer ${token}`}})
            const data: Category[] = response.data
            setCategories(data)
        }catch(error: any){
            console.log(error)
        }
    }