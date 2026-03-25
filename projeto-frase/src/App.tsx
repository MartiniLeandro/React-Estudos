import { useState } from 'react'
import './App.css'
import logo from './assets/logo.png'

function App() {
  const [frasesCategoria, setFrasesCategoria] = useState<string[]>([]);
  const [frase, setFrase] = useState<string>();

  interface frases {
    id:number,
    nome:string,
    frases:string[]
  }

  

  const allFrases:frases[] = [
    {
      id: 1,
      nome: "Motivação",
      frases: [
        "Siga os bons e aprenda com eles.",
        "O bom-senso vale mais do que muito conhecimento.",
        "O riso é a menor distância entre duas pessoas.",
        "Deixe de lado as preocupações e seja feliz.",
        "Realize o óbvio, pense no improvável e conquiste o impossível.",
        "Acredite em milagres, mas não dependa deles.",
        "A maior barreira para o sucesso é o medo do fracasso."
      ]
    },
    {
      id: 2,
      nome: "Bom dia",
      frases: [
        "Acordar de bem com a vida é o primeiro passo para ter um dia abençoado! Bom dia, família!",
        "A melhor forma de acordar é pular da cama e se preparar para correr atrás de todos os seus sonhos! Bom dia, mundo!",
        "Escreva em seu coração: todo dia é o melhor dia do ano.",
        "Bom dia! Não se esqueça que a sua alma é o reflexo do sol, tão forte e brilhante quanto um girassol."
      ]
    }
  ]

  function setCategoria(frases:string[]){
    setFrasesCategoria(frases);
    console.log(frasesCategoria)
  }

  function mostrarFrase(){
    let fraseEscolhida = ''
    do{
      const indiceAleatorio = Math.floor(Math.random() * frasesCategoria.length);
      fraseEscolhida = frasesCategoria[indiceAleatorio];
    }while(fraseEscolhida == frase)
    setFrase(fraseEscolhida);
    console.log(frase)  
  }


  return (
    <main className='main'> 
      <div className="container">
        <img src={logo} alt="" className='img'/>
        <h2 className='title'>Categorias</h2>
        <div className="btns">
          {allFrases.map((item) => (
            <button key={item.id} className='btn-category' onClick={() => setCategoria(item.frases)}>{item.nome}</button>
          ))}
        </div>
        <button className='btn-frase' onClick={() => mostrarFrase()}>Gerar Frase</button>
        <div className="content">
          <p className='frase-content'>"{frase}"</p>
        </div>
      </div>
    </main>
  )
}

export default App
