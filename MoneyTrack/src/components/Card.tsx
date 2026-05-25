import type { LucideIcon } from "lucide-react";
import { formatCurrency } from "../pages/home/Home"

interface Props {
  type?: string,
  title: string,
  value?: number,
  icon?: LucideIcon
  formatValue: boolean;
  iconLaunchPage?: IconLaunchPage
}

interface IconLaunchPage {
  icon: LucideIcon,
  bgColor: string,
  color: string
}

export default function Card({type, title, icon:Icon, value, formatValue, iconLaunchPage}: Props){
    function getColorCard(){
      if(type == "revenue"){
        return "text-emerald-400"
      }
      if(type == "expense"){
        return "text-red-400"
      }

      return "text-white"
    }

    if(iconLaunchPage){
      const Icon = iconLaunchPage.icon;
      return(
        <div className="w-1/3 m-1 bg-[#121821] rounded-xl border border-white/10 flex gap-5 p-3.5 items-center">
          <div>
            <div className={`${iconLaunchPage.bgColor} ${iconLaunchPage.color} rounded-full`}><Icon/></div>
          </div>
          <div>
            <div className="flex justify-between">
              <p className="text-gray-400">{title}</p>
            </div>
            <h2 className={`font-bold text-2xl ${getColorCard()}`}>{formatValue === true ? formatCurrency(value) : value}</h2>
          </div>
      </div>
      )
    }

    return(
      <div className="w-1/3 m-1 bg-[#121821] rounded-xl border border-white/10 flex flex-col gap-3.5 p-2.5">
          <div className="flex justify-between">
            <p className="">{title}</p>
            <div className={`${getColorCard()}`}>{Icon && <Icon/>}</div>
          </div>
          
          <h2 className={`font-bold text-2xl ${getColorCard()}`}>{formatValue === true ? formatCurrency(value) : value}</h2>
      </div>
    )
}