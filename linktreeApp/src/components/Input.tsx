import type { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{

}

export function Input(props:InputProps){
    return(
        <input className="bg-amber-50 w-full pl-3 py-1.5 rounded-sm placeholder-gray-950" {...props}/>
    )
}