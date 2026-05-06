import { useEffect, useState } from "react"
import type { DashboardHome } from "../../types/DashboardHome";
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


    return(
      <div>
        <div className="flex bg-amber-200 justify-around">
          <h2>Saldo total: {dashboardData?.totalBalanceMonth}</h2>
          <h2>Total recebido: {dashboardData?.totalRevenueMonth}</h2>
          <h2>Total gasto: {dashboardData?.totalExpenseMonth}</h2>
        </div>
        {dashboardData?.lastLaunches.map(launch => (
          <div className="flex items-center justify-center gap-2.5 bg-amber-400">
            <p>{launch.id}</p>
            <p>{launch.description}</p>
            <p>{launch.value}</p>
            <p>{launch.date}</p>
          </div>
        ))}
        <div>
          {dashboardData?.totalRevenueCategoriesMonth.map(category => (
            <div className="flex justify-center items-center bg-amber-600">
              <p>{category.name} <span>{category.totalValue} {category.porcentagem}%</span></p>
            </div>
          ))}
          {dashboardData?.totalExpenseCategoriesMonth.map(category => (
            <div className="flex justify-center items-center bg-amber-900">
              <p>{category.name} <span>{category.totalValue} {category.porcentagem}%</span></p>
            </div>
          ))}
        </div>
        <div className="flex justify-center item bg-blue-300 gap-2">
          <input type="month" value={monthYear} onChange={(e) => setMonthYear(e.target.value)} className="border-2 py-1.5 my-1.5 rounded-md cursor-pointer"/>
          <button type="submit" onClick={changeDate} className="border-2 px-3.5 my-1.5 rounded-md cursor-pointer">Mudar data</button>
        </div>
      </div>
    )
}

