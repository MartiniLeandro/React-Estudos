import { useEffect, useState } from "react"
import type { DashboardHome } from "../../types/DashboardHome";
import api from "../../services/Api";

export default function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardHome>()

  useEffect(() => {
    getDadosDashboard()
  }, [])

  async function getDadosDashboard(){
    const token = localStorage.getItem("token")
    try{
        const response = await api.get<DashboardHome>("http://localhost:8080/user/launches/dashboard", {headers: {Authorization: `Bearer ${token}`}});
        const dataResponse:DashboardHome = response.data;
        setDashboardData(dataResponse);
    }catch(error){
      console.log(error)
    }
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
              <p>{category.name} <span>{category.totalValue}</span></p>
            </div>
          ))}
          {dashboardData?.totalExpenseCategoriesMonth.map(category => (
            <div className="flex justify-center items-center bg-amber-900">
              <p>{category.name} <span>{category.totalValue}</span></p>
            </div>
          ))}
        </div>
      </div>
    )
}

