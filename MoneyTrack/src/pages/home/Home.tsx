import { useEffect, useState } from "react"
import type { DashboardHome } from "../../types/DashboardHome";
import { Wallet, ArrowDown, ArrowUp, House, ReceiptText, ChartPie } from "lucide-react";
import api from "../../services/Api";
import logo  from '../../../public/logo (2).png'
import DoughnutCategory from "../../components/DoughnutCategory";

export default function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardHome>();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

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

  function formatedDate(date: string){
    return new Date(date).toLocaleDateString("pt-BR")
  }

  function formatCurrency(value: number = 0) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    })
  }

  function Card({title, value, icon, type}: any){
    function getColorCard(){
      if(type == "revenue"){
        return "text-emerald-400"
      }
      if(type == "expense"){
        return "text-red-400"
      }

      return "text-white"
    }

    return(
      <div className="w-1/3 m-1 bg-[#121821] rounded-xl border border-white/10 flex flex-col gap-3.5 p-2.5">
          <div className="flex justify-between">
            <p className="">{title}</p>
            <div className={`${getColorCard()}`}>{icon}</div>
          </div>
          <h2 className={`font-bold text-2xl ${getColorCard()}`}>{formatCurrency(value)}</h2>
      </div>
    )
  }

  

    return(
      <div className="flex w-full h-screen">

        {/*SIDEBAR*/}
        <div className="w-52 bg-[#0C131C] border-r border-white/5"> 
          <img src={logo} className="mt-4"/>
          <div className="flex flex-col mt-10">
            <div className="p-1.5 m-1 rounded-b-sm flex gap-1.5 mx-5"><House/> Início</div>
            <div className="p-1.5 m-1 rounded-b-sm flex gap-1.5 mx-5"><ReceiptText/> Lançamentos</div>
            <div className="p-1.5 m-1 rounded-b-sm flex gap-1.5 mx-5"><ChartPie/> Resumo</div>
          </div>
        </div>

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
            <Card title="Saldo total" value={dashboardData?.totalBalanceMonth} icon={<Wallet/>} type="balance"/>
            <Card title="Entradas" value={dashboardData?.totalRevenueMonth} icon={<ArrowUp/>} type="revenue"/>
            <Card title="Saídas" value={dashboardData?.totalExpenseMonth} icon={<ArrowDown/>} type="expense"/>
          </div>

          {/*ÁREA PRINCIPAL*/}
          <div className="flex flex-1 gap-4 min-h-0">

            {/*LANÇAMENTOS */}
            <div className="w-2/3 bg-[#121821] rounded-xl border border-white/10">
              <div className="flex justify-between m-3">
                <p>Últimos lançamentos</p>
                <button>ver todos</button>
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
                  {dashboardData?.lastLaunches.map(launch => (
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
            <div className="w-1/3 bg-[#121821] rounded-xl border border-white/10">
                  <p>Gastos por categoria</p>
                  <DoughnutCategory dashboardData={dashboardData}/>
            </div>
          </div>
        </div>
      </div>
    )
}

