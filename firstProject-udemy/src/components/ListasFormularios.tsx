import { useState, useEffect, useRef, useMemo } from "react";



function ListasFormularios(){
    const inputRef = useRef<HTMLInputElement>(null);
    const firstRender = useRef(true); 
    const [tasksList, setTasksList] = useState<string[]>([]);
    const [taskInput, setTaskInput] = useState("");

    useEffect(() => {
        const tasksSalvas = localStorage.getItem("@cursoreact")
        if(tasksSalvas){
            setTasksList(JSON.parse(tasksSalvas))
        }
    
    }, [])

    useEffect(() => { 
        if(firstRender.current){
            firstRender.current = false
            return;
        }
        localStorage.setItem("@cursoreact", JSON.stringify(tasksList))
    }, [tasksList])

    const totalTask = useMemo(() => {
        return tasksList.length
    }, [tasksList])

    function adicionarTarefa(){
        if(!taskInput){
            alert("Preencha o nome da sua tarefa")
            return;
        }
        setTasksList([...tasksList, taskInput])
        setTaskInput("")
    }

    function deletarTarefa(item:string){
        const novoArray = tasksList.filter((task) => task !==  item)
        setTasksList(novoArray)
    }

    function editarTask(){
        if(inputRef.current){
            inputRef.current.placeholder = "Editar tarefa"
            inputRef.current.focus()
        }
    }

    return(
        <div>
            <h1>Lista de tarefas</h1>
            <input type="text" placeholder="adicionar tarefa" value={taskInput} onChange={e => setTaskInput(e.target.value)} ref={inputRef}/>
            <button onClick={adicionarTarefa}>adicionar</button>
            <hr />
            <strong>Você tem {totalTask} tarefas!!</strong>
            <br/><br/>
            {tasksList.map((task,index) => (
                <section key={index}>
                    <span>{index + 1}- {task}</span>
                    <button onClick={editarTask}>Editar</button>
                    <button onClick={() => deletarTarefa(task)}>Deletar</button>
                </section>
            ))}

        </div>
    )
}

export default ListasFormularios;