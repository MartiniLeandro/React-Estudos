import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { DashboardHome } from "../types/DashboardHome";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

interface props {
    dashboardData?: DashboardHome
}


export default function DoughnutCategory({dashboardData}: props){
    const chartData = {
    labels: dashboardData?.totalRevenueCategoriesMonth.map(
        category => category.name
    ),

    datasets: [
        {
        data: dashboardData?.totalRevenueCategoriesMonth.map(
            category => category.totalValue
        ),

        backgroundColor: [
            "#10B981",
            "#F59E0B",
            "#8B5CF6",
            "#EF4444",
            "#3B82F6",
            "#14B8A6"
        ],

        borderWidth: 0
        }
    ]
    }

    const chartOptions = {
    responsive: false,

    plugins: {
        legend: {
        display: false
        }
    },

    cutout: "70%"
  }


    return (
        <Doughnut data={chartData} options={chartOptions}/>
    )
}