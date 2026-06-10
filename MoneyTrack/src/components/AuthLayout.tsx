import {type ReactNode } from 'react'
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
        <div className="min-h-screen flex text-white relative overflow-hidden">

            <div className="absolute inset-0 bg-linear-to-br from-[#0B0F14] via-[#0E1621] to-[#0B0F14]" />

            {/*MAIN*/}
            <div className="absolute w-125 h-125 bg-green-500/10 blur-[120px] rounded-full top-1/2 left-1/3 -translate-y-1/2"/>
            <div className="relative flex w-full">
                <div className="hidden md:flex w-1/2 flex-col justify-center ml-16">
                    <div>
                        <img src={logo} className="max-w-2xs -ml-9"/>
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
                        <p className="text-gray-400 mb-10">{subtitle}</p>
                    </div>
                    <div className="space-y-6">
                        {featuresItems.map(feature => (
                            <div className="flex items-center gap-4">
                                <div className="bg-[#121821]/80 p-3 rounded-xl">{feature.icon}</div>
                                <div>
                                    <h3 className="font-medium">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="relative -mb-20">
                        <img src={imageLogin} className="max-w-2/3"/>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-20 bg-green-500/20 blur-3xl rounded-full"/>
                    </div>
                </div>


                {/*FORMULÁRIO*/}
                <div className="flex w-full md:w-1/2 items-center justify-center mr-6">

                    <div className="w-full max-w-xl bg-[#121821]/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}