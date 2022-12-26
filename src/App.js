import React, {Component, useState, useCallback, useEffect} from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList"


const App = () => {
    const [nextId, setNextId] = useState(null)
    const [tasks, setTasks] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [hasFetchedFirst, setHasFetchedFirst] = useState(false)   

    const setTaskStatus = useCallback(
        (taskId, isDone) => {
            console.log("prout", tasks)
            const taskIndex = tasks.findIndex(t => t.id === taskId) 
            const tasksBefore = tasks.slice(0, taskIndex) 
            const tasksAfter = tasks.slice(taskIndex + 1)
            const newTask = tasks[taskIndex]
            newTask.isDone = isDone
            setTasks([...tasksBefore, newTask, ...tasksAfter])
        },
        [tasks]
    )

    useEffect(() => {
        if(!hasFetchedFirst){
            setHasFetchedFirst(true)
            setHasError(false)
            setIsFetching(true)

            fetch("https://my-json-server.typicode.com/Eli-Sensei/ReactCourse/tasks")
            .then(res => {
                // console.log("prout", res)
                return res.json()
            })
            .then(newTasks => {
                console.log("prout", newTasks)
                setIsFetching(false)
                setTasks(
                    newTasks.map(task => ({
                        id: task.id,
                        label: task.title,
                        isDone: false
                    })),
                )

                setNextId(Math.max(tasks.map(task => task.id)) + 1)
                
            })
            .catch(() => {
                setHasError(true)
                setIsFetching(false)
            })
        }
    })

    const addTask = useCallback(
        label => {
            const newTask = {
                id: nextId,
                label,
                isDone: false
            }
            console.log(nextId)
            setNextId(nextId + 1)
            setTasks([...tasks, newTask])
        },
        [nextId, tasks],
    )

    const deleteTask = useCallback(
        taskId => {
            const taskIndex = tasks.findIndex(t => t.id === taskId) 
            const tasksBefore = tasks.slice(0, taskIndex) 
            const tasksAfter = tasks.slice(taskIndex + 1)

            setTasks([...tasksBefore, ...tasksAfter])

            console.log(tasks[taskIndex])
        },
        [tasks]
    )

    if(hasError)
    return <p>Oups, on dirait qu'une erreur s'est produite ^^"</p>
    
    if(isFetching)
    return <p>Chargement en cours....</p>


    return (
        
        <div> 
            <h1>Tâches</h1> 
            <TaskList 
                tasks={tasks} 
                setTaskStatus={setTaskStatus} 
                deleteTask={deleteTask}
            /> 
            <TaskForm addTask={addTask} /> 
        </div>
    ) 
}


export default App