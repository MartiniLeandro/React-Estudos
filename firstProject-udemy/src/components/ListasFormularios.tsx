import { useState, useEffect } from "react";



function ListasFormularios(){
    const [tasksList, setTasksList] = useState<string[]>([])
    const [taskInput, setTaskInput] = useState("")

    useEffect(() => {
        const tasksSalvas = localStorage.getItem("@cursoreact")
        if(tasksSalvas){
            setTasksList(JSON.parse(tasksSalvas))
        }
    
    }, [])

    function adicionarTarefa(){
        if(!taskInput){
            alert("Preencha o nome da sua tarefa")
            return;
        }
        setTasksList([...tasksList, taskInput])
        setTaskInput("")
        localStorage.setItem("@cursoreact", JSON.stringify([...tasksList, taskInput]))
    }

    function deletarTarefa(item:string){
        const novoArray = tasksList.filter((task) => task !==  item)
        setTasksList(novoArray)
        localStorage.setItem("@cursoreact",JSON.stringify(novoArray))
    }

    return(
        <div>
            <h1>Lista de tarefas</h1>
            <input type="text" placeholder="adicionar tarefa" value={taskInput} onChange={e => setTaskInput(e.target.value)}/>
            <button onClick={adicionarTarefa}>adicionar</button>
            <hr />
            {tasksList.map((task,index) => (
                <section key={index}>
                    <span>{index + 1}- {task}</span>
                    <button>Editar</button>
                    <button onClick={() => deletarTarefa(task)}>Deletar</button>
                </section>
            ))}

        </div>
    )
}

export default ListasFormularios;