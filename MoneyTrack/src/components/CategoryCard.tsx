import { Info, Tag } from "lucide-react";

interface Props {
  totalQuantity?: number,
  expenseQuantity?: number,
  revenueQuantity?: number;
}

export default function CategoryCard({totalQuantity, expenseQuantity, revenueQuantity}: Props){
    return(
        <div className="bg-[#121821] rounded-xl border border-white/10 px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <Tag className="w-8 h-8 text-green-400 rotate-90"/>
            </div>
            <div>
              <p className="text-sm text-gray-400">Total de categorias</p>
              <h2 className="text-3xl font-bold">{totalQuantity}</h2>
              <span className="text-sm text-gray-400 mr-2.5">• {revenueQuantity} receitas</span>
              <span className="text-sm text-gray-400">• {expenseQuantity} despesas</span>
            </div>
          </div>
          <div className="bg-white/2 border border-white/10 rounded-xl p-4 max-w-md">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Sobre categorias</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Organize suas finanças criando categorias personalizadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}