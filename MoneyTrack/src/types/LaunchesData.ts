export interface LaunchesData {
    launches: Launch[],
    typeValues: TypeValues,
    totalValueByPeriodLaunches: number,
    totalValue: number,
    categoryTotal: CategoriesTotal[]
}

export interface Launch {
    id: number,
    description: string,
    category: Category
    value: number,
    date: string
}

export interface Category {
    id: number,
    name: string,
    typeValue: string,
    icon: string,
    color: string,
    userId: number
}

interface TypeValues {
    revenue: number,
    expense: number
}

interface CategoriesTotal {
    name: string,
    totalValue: number
}

export interface launchesFilter {
    initialDate?: string,
    finalDate?: string,
    typeValue?: string,
    categoryId?: number,
    description?: string;
}