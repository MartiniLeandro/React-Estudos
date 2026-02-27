interface propsAluno {
  nome: string;
  idade: number;
}


function Aluno({nome,idade}: propsAluno){
  return (
    <>
      <h1>Aluno: {nome}</h1>
      <h3>idade: {idade}</h3>
    </>
  )
}

export default Aluno;