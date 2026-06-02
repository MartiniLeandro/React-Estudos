export interface DashboardHome {
    totalRevenueMonth: number,
    totalExpenseMonth: number,
    totalBalanceMonth: number,
    totalRevenueCategoriesMonth: CategoryTotal[],
    totalExpenseCategoriesMonth: CategoryTotal[],
    lastLaunches: LastLaunches[]

}

interface CategoryTotal {
    name: string,
    totalValue: number,
    porcentagem: number
}

interface LastLaunches {
    id: number,
    description: string,
    value: number,
    date: string,
    typeValue: string
    categoryName: string,
    categoryIcon: string,
    categoryColor: string
}