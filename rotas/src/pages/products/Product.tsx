import { useParams } from "react-router-dom"

export function Product(){
    const {id} = useParams()
    return(
        <h1>Bem vindo ao produto {id}</h1>
    )
}