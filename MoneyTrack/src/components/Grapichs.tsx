import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { DashboardHome } from "../types/DashboardHome";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

interface propsCategory {
    dashboardData?: DashboardHome,
    type: "revenue" | "expense"
}

export const colors = [
            "#10B981",
            "#F59E0B",
            "#8B5CF6",
            "#EF4444",
            "#3B82F6",
            "#14B8A6"
        ]


export function DoughnutCategory({dashboardData, type}: propsCategory){

    const typeCategory = type === "revenue" ? dashboardData?.totalRevenueCategoriesMonth : dashboardData?.totalExpenseCategoriesMonth

    const chartData = {
    labels: typeCategory?.map(
        category => category.name
    ),

    datasets: [
        {
        data: typeCategory?.map(
            category => category.totalValue
        ),

        backgroundColor: colors,

        borderWidth: 0
        }
    ]
    }

    const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,

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

export function DoughnutTypeValue(){
    return(
        <h1>teste</h1>
    )
}