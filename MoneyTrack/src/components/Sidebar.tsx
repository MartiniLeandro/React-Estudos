import logo  from '../../public/logo (2).png'
import { Link, useNavigate } from "react-router-dom";
import { House, ReceiptText, ChartPie, CircleUser, ChevronDown, LogOut, ChevronUp} from 'lucide-react';
import { useProfileData } from '../hooks/useProfileData';
import { useEffect, useState } from 'react';

export default function Sidebar(){
  const {getProfileData, name, email } = useProfileData();
  const [profileInfo, setProfileInfo] = useState<boolean>(false)
  const navigate = useNavigate();

  useEffect(() => {
    getProfileData();
  }, [])

  function showExitProfile(){
    if(profileInfo){
      setProfileInfo(false)
    }else{
      setProfileInfo(true)
    }
  }

  function exit(){
    localStorage.removeItem("token")
    navigate("/login")
  }
  
    return(
        <div className="w-60 bg-[#0C131C] border-r border-white/5 flex flex-col justify-between"> 
          <div className="flex flex-col mt-5">
            <Link to="/"><img src={logo} className='mb-5'/></Link>
            <div className="p-1.5 m-1 rounded-b-sm flex gap-1.5 mx-5"><House/> <Link to="/">Início</Link></div>
            <div className="p-1.5 m-1 rounded-b-sm flex gap-1.5 mx-5"><ReceiptText/> <Link to="/launches">Lançamentos</Link></div>
            <div className="p-1.5 m-1 rounded-b-sm flex gap-1.5 mx-5"><ChartPie/> <Link to="/categories">Categorias</Link></div>
          </div>
          <div>
            {profileInfo && (
              <div className='border-t border-white/5 p-5 text-center cursor-pointer'>
                <button className='text-red-600 cursor-pointer' onClick={exit}><LogOut className='inline'/> Sair da conta</button>
              </div>
            )}
            <div className="border-t border-white/5 p-5 flex justify-center items-center cursor-pointer" onClick={showExitProfile}>
              <div>
                <CircleUser size={34} className=' mr-2'/>
              </div>
              <div>
                <p>{name}</p>
                <p>{email}</p>
              </div>
              <button className='ml-2 cursor-pointer'>{profileInfo ? <ChevronUp/> : <ChevronDown/>}</button>
            </div>
          </div>
        </div>
    )
}