import { useEffect, useState } from "react"

interface criptoStats {
    id: string,
    name: string,
    priceUsd: string,
    symbol: string,
    vwap24Hr: string

}

interface criptoResponse {
    timestamp: number,
    data: criptoStats[]
}


export default function AsyncTraining(){
    const [criptoStats, setCriptoStats] = useState<criptoStats[]>([])
    
    useEffect(() => {
        async function carregarCriptos(){
            try{
                const response = await fetch("https://rest.coincap.io/v3/assets?limit=10")
                const json:criptoResponse = await response.json()
                const criptosFormatadas:criptoStats[] = json.data.map(cripto => {
                    return {
                        id: cripto.id,
                        name: cripto.name,
                        priceUsd: cripto.priceUsd,
                        symbol: cripto.symbol,
                        vwap24Hr: cripto.vwap24Hr
                    }
                })
                setCriptoStats(criptosFormatadas)
                console.log(criptosFormatadas)
            }catch(error){
                console.log(error)
            }
        }
        
        carregarCriptos()
    }, [])

    return(
        <div className="container">
            {criptoStats.map(cripto => (
                <div>
                    <h1>{cripto.name}</h1>
                    <h2>{cripto.priceUsd}</h2>
                    <h2>{cripto.symbol}</h2>
                    <h2>{cripto.vwap24Hr}</h2>
                </div>
            ))}
        </div>
    )
}