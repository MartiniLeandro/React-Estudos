import './App.css'
import HelloWorld from './components/HelloWorld'
import SayMyName from './components/SayMyName';
import Pessoa from './components/Pessoa';
import List from './components/List';

function App() {

  const name = 'Leandro';
  const newName = name.toUpperCase()
  const url = 'https://placehold.co/150'

  const soma = (n1,n2) => n1 + n2 

  return (
    <div className="App">
      {/*<h1>Olá React!</h1>
      <p>Meu primeiro App</p>
      <p>{newName}</p>
      <p>Soma: {soma(2,2)}</p>
      <img src={url} alt="imagem teste" />*/}
      <HelloWorld/>
      <SayMyName nome = {name}/>
      <Pessoa foto={url} nome={name} idade='20' profissao="programador" />
      <List/>
    </div>
  )
}

export default App
