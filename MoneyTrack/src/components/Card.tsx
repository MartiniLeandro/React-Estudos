import { formatCurrency } from "../pages/home/Home"

export default function Card({type, title, icon, value}: any){
    function getColorCard(){
      if(type == "revenue"){
        return "text-emerald-400"
      }
      if(type == "expense"){
        return "text-red-400"
      }

      return "text-white"
    }

    return(
      <div className="w-1/3 m-1 bg-[#121821] rounded-xl border border-white/10 flex flex-col gap-3.5 p-2.5">
          <div className="flex justify-between">
            <p className="">{title}</p>
            <div className={`${getColorCard()}`}>{icon}</div>
          </div>
          <h2 className={`font-bold text-2xl ${getColorCard()}`}>{formatCurrency(value)}</h2>
      </div>
    )
}