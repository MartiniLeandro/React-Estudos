import { useState } from "react";
import './App.css'

interface infoFuel {
    alcool: number,
    gasolina: number,
    melhorCusto?: string;
}

function App(){
    const [alcool, setAlcool] = useState('')
    const [gasolina, setGasolina] = useState('')
    const [infoFuel, setInfoFuel] = useState<infoFuel>()
    const [showResult, setShowResult] = useState(false)

    function calcularCombustivel(){
      setShowResult(true)
        const calculoCombustivel:number = Number(alcool) / Number(gasolina);
        if(calculoCombustivel < 0.7) {
            setInfoFuel({alcool: Number(alcool), gasolina: Number(gasolina), melhorCusto: "Álcool"})
        }else {
            setInfoFuel({alcool: Number(alcool), gasolina: Number(gasolina), melhorCusto: "Gasolina"})
        }
        
    }

    return(
        <div className="main">
          <img src="logo.png" alt="" className="image"/>
          <h2>Qual a melhor opção?</h2>
          <div className="inputs">
            <p>Álcool (preço por litro)</p>
            <input className="input" type="number" value={alcool} onChange={(e) => setAlcool(e.target.value)}/>
            <p>Gasolina (preço por litro)</p>
            <input className="input" type="number" value={gasolina} onChange={(e) => setGasolina(e.target.value)}/>
            <button className="btn" onClick={calcularCombustivel}>Calcular</button>
          </div>

            <div className={`container-values ${showResult ? '' : 'hide'}`}>
              <h2>Compensa usar {infoFuel?.melhorCusto}</h2>
              <p>Álcool: R${infoFuel?.alcool},00</p>
              <p>Gasolina: R${infoFuel?.gasolina},00</p>
            </div>
        </div>
    )
}

export default App;