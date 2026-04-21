import {FaFacebook, FaYoutube, FaInstagram} from 'react-icons/fa'

export function Home(){
    return(
        <div className="flex flex-col justify-center items-center w-full">
            <h1 className="md:text-4xl text-3xl text-white font-bold mt-20">Sujeito Programador</h1>
            <span className="text-gray-50 mt-3 mb-5">Veja meus links 👇</span>
            <div className="flex flex-col w-11/12 max-w-xl text-center">
                <div className="p-1.5 mb-3 bg-green-300 rounded-sm select-none transition-transform hover:scale-105 cursor-pointer"><a><p>Link 1</p></a></div>
                <div className="p-1.5 mb-3 bg-red-500 rounded-sm select-none transition-transform hover:scale-105 cursor-pointer"><a>Link 2<p></p></a></div>
                <div className="p-1.5 mb-3 bg-blue-300 rounded-sm select-none transition-transform hover:scale-105 cursor-pointer"><a>Link 3<p></p></a></div>
                <div className="p-1.5 mb-3 bg-amber-500 rounded-sm select-none transition-transform hover:scale-105 cursor-pointer"><a>Link 4<p></p></a></div>
            </div>
            <div className="flex justify-center gap-3 my-4">
                <div className='cursor-pointer'><a href="https://www.facebook.com/?locale=pt_BR" target='_blank'><FaFacebook color='#fff' size={35}/></a></div>
                <div className='cursor-pointer'><a href="https://www.youtube.com" target='_blank'><FaYoutube color='#fff' size={35}/></a></div>
                <div className='cursor-pointer'><a href="https://www.facebook.com/?locale=pt_BR" target='_blank'><FaInstagram color='#fff' size={35}/></a></div>
            </div>
        </div>
    ) 
}