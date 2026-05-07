import { useEffect, useState } from "react"
import type { DashboardHome } from "../../types/DashboardHome";
import { Wallet, ArrowDown, ArrowUp } from "lucide-react";
import api from "../../services/Api";

export default function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardHome>();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [monthYear, setMonthYear] = useState("");

  useEffect(() => {
    getDadosDashboard(year,month)
  }, [year,month])

  async function getDadosDashboard(selectedYear:number, selectedMonth:number){
    const token = localStorage.getItem("token")
    try{
        selectedYear = 2025 //momentaneo para testes
        selectedMonth = 9 //momentaneo para testes
        const response = await api.get<DashboardHome>(`/user/launches/dashboard?year=${selectedYear}&month=${selectedMonth}`, {headers: {Authorization: `Bearer ${token}`}});
        console.log(response.request)
        const dataResponse:DashboardHome = response.data;
        setDashboardData(dataResponse);
    }catch(error){
      console.log(error)
    }
  }

  function changeDate(){
    const [year, month] = monthYear.split("-");
    const yearNumber = Number(year);
    const monthNumber = Number(month);
    setMonth(monthNumber);
    setYear(yearNumber)
  }

  function formatedDate(date: string){
    return new Date(date).toLocaleDateString("pt-BR")
  }


    return(
      <div className="flex w-full h-screen">

        {/*SIDEBAR*/}
        <div className="w-1/6 bg-[#0B0F14] border-r border-white/5"> 
        
        </div>

        {/*CONTEUDO*/}
        <div className="flex-1 bg-[#0B0F14] flex flex-col p-8"> 

          {/*HEADER */}
          <div className="flex justify-between items-center">
            <div className="m-1">
              <h2>Olá, User</h2>
              <p>Aqui está o resumo das suas finanças</p>
            </div>
            <p className="m-1">filtro</p>
          </div>

          {/*CARDS */}
          <div className="flex gap-4 my-2">
            <Card title="Saldo total" value={dashboardData?.totalBalanceMonth} icon={<Wallet/>}/>
            <Card title="Entradas" value={dashboardData?.totalRevenueMonth} icon={<ArrowUp/>}/>
            <Card title="Saídias" value={dashboardData?.totalExpenseMonth} icon={<ArrowDown/>}/>
          </div>

          {/*ÁREA PRINCIPAL*/}
          <div className="flex flex-1 gap-4 min-h-0">

            {/*LANÇAMENTOS */}
            <div className="w-2/3 bg-[#121821] rounded-xl border border-white/5 p-4">
              <div className="flex justify-between">
                <p>Últimos lançamentos</p>
                <button>ver todos</button>
              </div>
              <table className="w-full mt-3">
                <thead className="border-b-gray-400 border-b-2">
                  <tr>
                    <th className="text-start">Data</th>
                    <th className="text-start">Descrição</th>
                    <th className="text-start">Categoria</th>
                    <th className="text-start">Tipo</th>
                    <th className="text-start">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.lastLaunches.map(launch => (
                    <tr key={launch.id}>
                      <td>{formatedDate(launch.date)}</td>
                      <td>{launch.description}</td>
                      <td>{launch.category}</td>
                      <td>|</td>
                      <td>{launch.value}</td>
                    </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/*GRÁFICO */}
            <div className="w-1/3 bg-[#121821] rounded-xl border border-white/5">
                  <p>gastos por categoria</p>
            </div>
          </div>
        </div>
      </div>
    )


    function Card({title, value, icon}: any){
      return(
        <div className="w-1/3 m-1 bg-[#121821] rounded-xl border border-white/5">
            <p>{title}</p>
            <h2>{value}</h2>
            <div>{icon}</div>
        </div>
      )
    }
}

