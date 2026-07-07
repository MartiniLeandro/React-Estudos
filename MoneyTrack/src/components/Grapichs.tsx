import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { DashboardHome } from "../types/DashboardHome";
import type { LaunchesData } from "../types/LaunchesData";
import { formatCurrency } from "../pages/home/HomePage";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

interface propsCategory {
    dashboardData?: DashboardHome,
    type: "revenue" | "expense"
}

interface propsTypeValue {
    data?: LaunchesData
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

export function DoughnutTypeValue({ data }: propsTypeValue){
    const revenue = data?.typeValues?.revenue ?? 0;
    const expense = data?.typeValues?.expense ?? 0;
    const total = revenue + expense;

    const chartData = {
        labels: ['Receitas', 'Despesas'],
        datasets: [
            {
                data: [
                    revenue,
                    expense
                ],
                backgroundColor: [
                    '#10B981',
                    '#EF4444'
                ],
                borderWidth: 0,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        cutout: "70%"
    };


    return (
        <div className="flex flex-col h-full items-center justify-center">
            <div className="h-38 w-38">
                <Doughnut data={chartData} options={chartOptions}/>
            </div>
            <div className="mt-4 space-y-2 w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span className="text-sm text-gray-400">Receitas</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold">{formatCurrency(revenue)}</span>
                        <span className="text-xs text-gray-500">({total > 0 ? ((revenue / total) * 100).toFixed(0) : 0}%)</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="text-sm text-gray-400">Despesas</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold">{formatCurrency(expense)}</span>
                        <span className="text-xs text-gray-500">({total > 0 ? ((expense / total) * 100).toFixed(0) : 0}%)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface propsCategorySpending {
    data?: LaunchesData
}

export function CategorySpendingChart({ data }: propsCategorySpending) {
    const totalExpenses = data?.typeValues?.expense ?? 0;
    const expenseCategories = data?.categoryTotals?.filter(c => c.totalValue > 0) ?? [];

    if (totalExpenses <= 0 || expenseCategories.length === 0) {
        return (
            <div className="flex flex-col h-full">
                <h2 className="text-lg font-bold">Gastos por Categoria</h2>
                <div className="flex-1 flex items-center justify-center text-gray-500">
                    Nenhum gasto no período
                </div>
            </div>
        );
    }

    const sortedCategories = [...expenseCategories].sort((a, b) => b.totalValue - a.totalValue);

    return (
        <div className="flex flex-col h-full overflow-y-hidden">
            <h2 className="text-lg font-bold mb-4">Gastos por Categoria</h2>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {sortedCategories.map((category, index) => {
                    const percentage = (category.totalValue / totalExpenses) * 100;
                    const color = colors[index % colors.length];

                    return (
                        <div key={category.name}>
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="text-sm text-gray-300">{category.name}</span>
                                <span className="text-sm font-semibold">
                                    {formatCurrency(category.totalValue)}
                                    <span className="ml-2 text-xs text-gray-500">({percentage.toFixed(0)}%)</span>
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="h-2 rounded-full" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}