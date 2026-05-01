import {FaFacebook, FaYoutube, FaInstagram} from 'react-icons/fa'
import {myLinks} from "../../services/LinksItem"

export function Home(){
    const links = myLinks;
    return(
        <div className="flex flex-col justify-center items-center w-full">
            <h1 className="md:text-4xl text-3xl text-white font-bold mt-20">Sujeito Programador</h1>
            <span className="text-gray-50 mt-3 mb-5">Veja meus links 👇</span>
            <div className="flex flex-col w-11/12 max-w-xl text-center">
                {links.map(link => (
                    <div className="p-1.5 mb-3 rounded-sm select-none transition-transform hover:scale-105 cursor-pointer" style={{backgroundColor: link.bgColor, color: link.textColor}}><a><p>{link.link}</p></a></div>
                ))}
            </div>
            <div className="flex justify-center gap-3 my-4">
                <div className='cursor-pointer'><a href="https://www.facebook.com/?locale=pt_BR" target='_blank'><FaFacebook color='#fff' size={35}/></a></div>
                <div className='cursor-pointer'><a href="https://www.youtube.com" target='_blank'><FaYoutube color='#fff' size={35}/></a></div>
                <div className='cursor-pointer'><a href="https://www.facebook.com/?locale=pt_BR" target='_blank'><FaInstagram color='#fff' size={35}/></a></div>
            </div>
        </div>
    ) 
}