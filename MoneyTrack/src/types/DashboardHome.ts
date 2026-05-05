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
    totalValue: number
}

interface LastLaunches {
    id: number,
    description: string,
    value: number,
    date: string
}