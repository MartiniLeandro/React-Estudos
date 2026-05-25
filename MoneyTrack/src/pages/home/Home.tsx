import { useEffect, useState } from "react"
import type { DashboardHome } from "../../types/DashboardHome";
import { Wallet, ArrowDown, ArrowUp} from "lucide-react";
import api from "../../services/Api";
import DoughnutCategory from "../../components/DoughnutCategory";
import Card from "../../components/Card";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { colors } from "../../components/DoughnutCategory";


export default function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardHome>();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [categoryType, setCategoryType] = useState<"revenue" | "expense">("revenue");

  useEffect(() => {
    getDadosDashboard(year,month)
  }, [year,month])

  async function getDadosDashboard(selectedYear:number, selectedMonth:number){
    const token = localStorage.getItem("token")
    try{
        selectedYear = year
        selectedMonth = month
        const response = await api.get<DashboardHome>(`/user/launches/dashboard?year=${selectedYear}&month=${selectedMonth}`, {headers: {Authorization: `Bearer ${token}`}});
        console.log(response.data)
        const dataResponse:DashboardHome = response.data;
        setDashboardData(dataResponse);
    }catch(error){
      console.log(error)
    }
  }

  function changeDate(e: React.ChangeEvent<HTMLInputElement>){
    const [year, month] = e.target.value.split("-")
    const yearNumber = Number(year);
    const monthNumber = Number(month);
    setMonth(monthNumber);
    setYear(yearNumber)
  }

  const categories = categoryType === "revenue" ? dashboardData?.totalRevenueCategoriesMonth : dashboardData?.totalExpenseCategoriesMonth 

    return(
      <div className="flex w-full h-screen">

        {/*SIDEBAR*/}
        <Sidebar/>

        {/*CONTEUDO*/}
        <div className="flex-1 bg-[#0B0F14] flex flex-col p-8"> 

          {/*HEADER */}
          <div className="flex justify-between items-center">
            <div className="m-1">
              <h2 className="text-2xl font-bold">Olá, User👋</h2>
              <p className="text-gray-400">Aqui está o resumo das suas finanças.</p>
            </div>
            <input type="month" className="rounded-xl border border-white/20 p-2.5" value={`${year}-${String(month).padStart(2, "0")}`} onChange={changeDate}/>
          </div>

          {/*CARDS */}
          <div className="flex gap-4 my-2">
            <Card title="Saldo total" value={dashboardData?.totalBalanceMonth} icon={Wallet} type="balance" formatValue ={true}/>
            <Card title="Entradas" value={dashboardData?.totalRevenueMonth} icon={ArrowUp} type="revenue" formatValue ={true}/>
            <Card title="Saídas" value={dashboardData?.totalExpenseMonth} icon={ArrowDown} type="expense" formatValue ={true}/>
          </div>

          {/*ÁREA PRINCIPAL*/}
          <div className="flex flex-1 gap-4 min-h-0">

            {/*LANÇAMENTOS */}
            <div className="w-2/3 bg-[#121821] rounded-xl border border-white/10">
              <div className="flex justify-between m-3">
                <p>Últimos lançamentos</p>
                <Link to="/launches">Ver todos</Link>
              </div>
              <table className="w-full mt-3 table-fixed">
                <thead>
                  <tr>
                    <th className="w-[18%] py-4 pl-4">Data</th>
                    <th className="w-[30%]">Descrição</th>
                    <th className="w-[30%]">Categoria</th>
                    <th className="w-[18%]">Tipo</th>
                    <th className="w-[18%]">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.lastLaunches.map(launch => ( //colocar o ícone
                    <tr key={launch.id} className="border border-white/5 hover:bg-white/10 transition">
                      <td className="py-4 pl-4 text-left">{formatedDate(launch.date)}</td>
                      <td>{launch.description}</td>
                      <td>{launch.category}</td>
                      {launch.typeValue === "REVENUE" ? <td className="text-emerald-400"><ArrowUp/></td> : <td className="text-red-400"><ArrowDown/></td>}
                      {launch.typeValue === "REVENUE" ? <td className="text-emerald-400">{formatCurrency(launch.value)}</td> : <td className="text-red-400">{formatCurrency(launch.value)}</td>}
                    </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/*GRÁFICO */}
            <div className="w-1/3 bg-[#121821] rounded-xl border border-white/10 flex flex-col gap-20">
              <div className="flex justify-center gap-20 my-2.5">
                <p className="text-2xl">Gastos por categoria</p>
                <select onChange={() => setCategoryType(categoryType === "revenue" ? "expense" : "revenue")} className="rounded-md border border-white/10">
                  <option value="revenue" className="bg-[#0B0F14]">Receitas</option>
                  <option value="expense" className="bg-[#0B0F14]">Despesas</option>
                </select>
              </div>
              <div className="w-full h-52 ">
                <DoughnutCategory dashboardData={dashboardData} type={categoryType}/>
              </div>
              <div>
                {categories?.map((category, index) => (
                  
                  <div className="grid grid-cols-3 py-1 mx-5">
                    <div className="flex items-center gap-2">
                      <div style={{backgroundColor: colors[index]}} className="w-3 h-3 rounded-full"/>
                      <p className="truncate">{category.name}</p>
                    </div>
                    <p className="text-center ml-5">{formatCurrency(category.totalValue)}</p>
                    <p className="text-right">{category.porcentagem}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

  export function formatCurrency(value: number = 0) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    })
  }

  export function formatedDate(date: string){
  const [year, month, day] =
  date.split("-");

  return `${day}/${month}/${year}`;
  }

