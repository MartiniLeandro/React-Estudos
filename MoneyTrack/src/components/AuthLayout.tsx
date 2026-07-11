import type { ReactNode } from 'react';
import logo from '../../public/logo (2).png'
import imageLogin from '../../public/image login.png'

interface FeatureItem {
    icon: ReactNode,
    title: string,
    description: string;
}

interface AuthLayoutProps {
    title: ReactNode,
    subtitle: string,
    featuresItems: FeatureItem[],
    children: ReactNode
}

export default function AuthLayout({title, subtitle, featuresItems, children}: AuthLayoutProps){
    return(
        <div className="min-h-screen flex text-white relative overflow-y-auto md:overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-[#0B0F14] via-[#0E1621] to-[#0B0F14] -z-10" />

            {/*MAIN*/}
            <div className="absolute w-125 h-125 bg-green-500/10 blur-[120px] rounded-full top-1/2 left-1/3 -translate-y-1/2 -z-10"/>

            <div className="relative flex flex-col md:flex-row w-full">

                <div className="flex flex-col w-full md:w-1/2 justify-center px-8 pt-10 md:px-0 md:pt-0 md:ml-16">
                    <div className='flex md:block justify-center '>
                        <img src={logo} className="max-w-50 md:max-w-2xs mb-6 md:mb-0 md:-ml-9 " alt="Logo"/>
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold mb-2 text-center md:text-left">{title}</h2>
                        <p className="text-gray-400 mb-6 md:mb-10 text-center md:text-left">{subtitle}</p>
                    </div>
                    <div className="hidden space-y-6 md:block">
                        {featuresItems.map((feature, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="bg-[#121821]/80 p-3 rounded-xl">{feature.icon}</div>
                                <div>
                                    <h3 className="font-medium">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="relative -mb-20 hidden md:block">
                        <img src={imageLogin} className="max-w-2/3" alt="Ilustração"/>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-20 bg-green-500/20 blur-3xl rounded-full"/>
                    </div>
                </div>

                {/*FORMULÁRIO*/}
                <div className="flex w-full md:w-1/2 items-center justify-center px-4 pb-12 md:px-0 md:pb-0 md:mr-6">
                    <div className="w-full max-w-xl bg-[#121821]/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/5">
                        {children}
                    </div>
                </div>
                
            </div>
        </div>
    )
}