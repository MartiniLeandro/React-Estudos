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
      <div className="flex w-full h-screen">
        {/*barra lateral*/}
        <div className="w-1/6 bg-amber-950 h-screen"> 
        
        </div>

        {/*conteudo principal*/}
        <div className="w-full bg-amber-400 flex flex-col p-8 border-2"> 

          <div className="flex justify-between items-center border-2">
            <div className="border-2 m-1">
              <h2>Olá, User</h2>
              <p>Aqui está o resumo das suas finanças</p>
            </div>
            <p className="border-2 m-1">filtro</p>
          </div>

          <div className="flex justify-evenly my-2 gap-2.5 border-2">
            <Card title="teste" value="R$123" icon="revenue"/>
            <Card title="teste" value="R$123" icon="revenue"/>
            <Card title="teste" value="R$123" icon="revenue"/>
          </div>

          <div className="w-2/3 flex-1 border-2">
            
          </div>




        </div>
      </div>
    )


    function Card({title, value, icon}: any){
      return(
        <div className="w-1/3 border-2 m-1">
            <p>{title}</p>
            <h2>{value}</h2>
            <div>{icon}</div>
        </div>
      )
    }
}

