import { useState } from 'react'
import './App.css'

function App() {
  
  const [inputNome, setInputNome] = useState<string>()
  const [inputAno, setInputAno] = useState<string>()
  const [resultado, setResultado] = useState<string>()


  function descobrirIdade(){
    const anoAtual = new Date().getFullYear();
    const idade = anoAtual - Number(inputAno)
    setResultado(`${inputNome}, você tem ${idade} anos`)
    setInputNome("")
    setInputAno("")
  }

  return (
   <div className="container">
    <h1 className='title'>Descubra sua idade</h1>
    <div className="container-inputs">
      <label className='input-label'>Digite seu nome?</label>
      <input type="text" name="" id="" placeholder='Digite seu nome...' className='input-text' value={inputNome} onChange={(e) => setInputNome(e.target.value)}/>
      <label className='input-label'>Digite o ano que nasceu?</label>
      <input type="text" name="" id="" placeholder='Digite o ano do nascimento...' className='input-text' value={inputAno} onChange={(e) => setInputAno(e.target.value)}/>
      <button type="submit" className='input-btn' onClick={descobrirIdade}>Descobrir idade</button>
    </div>
    <h2 className='data-info'>{resultado}</h2>
   </div>
  )
}

export default App
