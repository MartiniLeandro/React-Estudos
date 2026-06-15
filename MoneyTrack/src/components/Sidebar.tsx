import logo  from '../../public/logo (2).png'
import { Link } from "react-router-dom";
import { House, ReceiptText, ChartPie } from 'lucide-react';
import { useProfileData } from '../hooks/useProfileData';
import { useEffect } from 'react';

export default function Sidebar(){
  const {getProfileData, name, email } = useProfileData();

  useEffect(() => {
    getProfileData();
  }, [])
  
    return(
        <div className="w-52 bg-[#0C131C] border-r border-white/5 flex flex-col justify-between"> 
          <div className="flex flex-col mt-5">
            <Link to="/"><img src={logo} className='mb-5'/></Link>
            <div className="p-1.5 m-1 rounded-b-sm flex gap-1.5 mx-5"><House/> <Link to="/">Início</Link></div>
            <div className="p-1.5 m-1 rounded-b-sm flex gap-1.5 mx-5"><ReceiptText/> <Link to="/launches">Lançamentos</Link></div>
            <div className="p-1.5 m-1 rounded-b-sm flex gap-1.5 mx-5"><ChartPie/> Categorias</div>
          </div>
          <div>
            <div className="bg-[#121821] border border-white/10 mb-6 mx-2.5 p-3 rounded-xl">
              <p className='text-center'>{name} | {email}</p>
            </div>
          </div>
        </div>
    )
}