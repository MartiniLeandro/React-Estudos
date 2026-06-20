import { useEffect, useState } from "react";
import CategoryCard from "../../components/CategoryCard"
import Sidebar from "../../components/Sidebar"
import api from "../../services/Api";
import toast from "react-hot-toast";
import { icons, Lock, Pencil, Search, Trash2 } from "lucide-react";


interface CategoriesData {
    categories: Category[],
    TotalQuantity: number,
    ExpenseQuantity: number,
    RevenueQuantity: number
}

interface Category{
    id: number,
    name: string,
    typeValue: string,
    icon: string,
    color: string,
    userId: number
}

export default function Categorias(){
    const [categories, setCategories] = useState<Category[]>([])
    const [totalQuantity,setTotalQuantity] = useState<number>();
    const [expenseQuantity,setExpenseQuantity] = useState<number>();
    const [revenueQuantity,setRevenueQuantity] = useState<number>();

    useEffect(() => {
        getCategoriesData()
    }, [])

    async function getCategoriesData(){
        const token = localStorage.getItem("token");
        try{
            const response = await api.get<CategoriesData>("/categories/data", {headers: {Authorization: `Bearer ${token}`}})
            const data = response.data;
            setCategories(data.categories);
            setTotalQuantity(data.TotalQuantity);
            setExpenseQuantity(data.ExpenseQuantity);
            setRevenueQuantity(data.RevenueQuantity);
        }catch(error:any){
            if(error.response?.data?.message){
                toast.error(error.response.data.message)
           }else{
            toast.error("Erro interno. Por favor, tente novamente mais tarde")
           }
        }
    }

    function colorCategory(color: string) {

        if(color != null) return (
            <div className="w-5 h-5 rounded-full shadow-sm" style={{backgroundColor: `${color}`}}></div>
        )
        return <span className="text-gray-500">?</span>;
    }

    function formatIconName(dbName: string) {
        if (!dbName) return "";
        
        return dbName
            .split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
    }

    function renderIcon(iconName: string, color: string) {
        const formattedName = formatIconName(iconName);

        const LucideIcon = icons[formattedName as keyof typeof icons];
        
        if (!LucideIcon) {
            return <span className="text-gray-500">?</span>;
        }

        return <LucideIcon color={color} size={20} />;
    }

    return(
        <div className="flex w-full h-screen">

            {/*SIDEBAR*/}
            <Sidebar/>

            {/*CONTEUDO PRINCIPAL*/}
            <div className="flex-1 bg-[#0B0F14] flex flex-col p-8 gap-1.5">
                
                {/*HEADER*/}
                <header className="flex justify-between items-center mb-5">
                    <div>
                        <h2 className="font-bold text-2xl">Categorias</h2>
                        <p className="text-gray-400">Visualize e gerencia todas as categorias disponíveis no sistema.</p>
                    </div>
                    <div>
                        <button className="bg-green-600 p-3 rounded-md cursor-pointer">+ Nova categoria</button>
                    </div>
                </header>

                {/*CARD*/}
                <CategoryCard totalQuantity={totalQuantity} expenseQuantity={expenseQuantity} revenueQuantity={revenueQuantity}/>

                {/*FILTROS*/}
                <div className="flex justify-between mt-3.5">
                    <div className="flex items-end justify-end bg-gray-950 p-1 rounded-md border border-white/10">
                        <input type="text" placeholder="Buscar lançamento"/>
                        <Search/>
                    </div>              

                    <select className="">
                        <option value="">Todas as opções</option>
                    </select>
                </div>

                {/*TABELA*/}
                <div className="bg-[#121821] border border-white/10 rounded-xl overflow-hidden mt-6">
                    <table className="w-full mt-3 table-fixed">
                        <thead>
                        <tr>
                            <th className="w-[30%] py-4 pl-4">Categoria</th>
                            <th className="w-[20%]">Tipo</th>
                            <th className="w-[20%]">Cor</th>
                            <th className="w-[20%]">Ícone</th>
                            <th className="w-[15%] p-16">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <tr className="border border-white/5 hover:bg-white/10 transition" key={category.id}>
                                    <td className="py-4 pl-4">{category.name}</td>
                                    {category.typeValue == 'REVENUE' ? <td><span className="bg-green-950 p-1 text-green-400 rounded-md">Receita</span></td> : 
                                    <td><span className="bg-red-950 p-1 text-red-400 rounded-md">Despesa</span></td>}
                                    <td>{colorCategory(category.color)}</td>
                                    <td>{renderIcon(category.icon, category.color)}</td>
                                    {category.userId == null ? <td><div className="bg-white/6 border border-white/10 rounded-xl p-2 flex w-fit gap-1 text-[16px] items-center"><Lock width={20}/> Padrão do sistema</div></td> : 
                                    <td>
                                        <div className="flex gap-2.5 pl-9">
                                            <div className="bg-white/6 rounded-xl p-2"><Pencil className="text-gray-200 cursor-pointer"/></div>
                                            <div className="bg-white/6 rounded-xl p-2"><Trash2 className="cursor-pointer text-red-500"/></div>
                                        </div>
                                    </td>}
                                </tr>
                            ))} 

                        </tbody>
                    </table>
                </div>
            

            </div>
        </div>
    )
}