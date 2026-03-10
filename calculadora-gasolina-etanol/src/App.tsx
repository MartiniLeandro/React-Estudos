import { useState } from "react";
import './App.css'

interface infoFuel {
    alcool: number,
    gasolina: number,
    melhorCusto?: string;
}

function App(){
    const [alcoolInput, setAlcoolInput] = useState<number>(0)
    const [gasolinaInput, setGasolinaInput] = useState<number>(0)
    const [infoFuel, setInfoFuel] = useState<infoFuel>()
    const [showResult, setShowResult] = useState(false)

    function calcularCombustivel(){
      setShowResult(true)
        const calculoCombustivel = alcoolInput / gasolinaInput;
        if(calculoCombustivel < 0.7) {
            setInfoFuel({alcool: (alcoolInput), gasolina: (gasolinaInput), melhorCusto: "Álcool"})
        }else {
            setInfoFuel({alcool: (alcoolInput), gasolina: (gasolinaInput), melhorCusto: "Gasolina"})
        }
        
    }

    return(
        <div className="main">
          <img src="logo.png" alt="" className="image"/>
          <h2>Qual a melhor opção?</h2>
          <div className="inputs">
            <p className="info-alcool">Álcool (preço por litro)</p>
            <input className="input" type="number" onChange={(e) => setAlcoolInput(Number(e.target.value))}/>
            <p className="info-gasolina">Gasolina (preço por litro)</p>
            <input className="input" type="number" onChange={(e) => setGasolinaInput(Number(e.target.value))}/>
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