export interface LaunchesData {
    launches: Launch[],
    typeValues: TypeValues,
    totalLaunches: number,
    totalValue: number,
    categoryTotal: CategoriesTotal[]
}

interface Launch {
    id: number,
    description: string,
    category: Category //trocar isso depois no backend, não receber a category completa
    value: number,
    date: string
}

export interface Category {
    id: number,
    name: string,
    typeValue: string,
    icon: string

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
    categoryId?: number
}