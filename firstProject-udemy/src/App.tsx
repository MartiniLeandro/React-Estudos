import Header from "./components/Header";
import Aluno from "./components/Aluno";
import Footer from "./components/Footer";

function App(){
  return (
    <div>
      <Header title="Aprendendo do zero ao avançado"/>
      <h1>Meu projeto</h1>
      <Aluno nome = "Leandro Martini" idade={20}/>
      <Aluno nome = "Gabriel martini" idade={22}/>
      <Aluno nome = "Leandro martini" idade={15}/>
      <Footer/>
    </div>
  )
}

export default App;

