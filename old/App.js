import React, {Component} from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList"


class App extends Component {
    constructor(props){
        super(props)
        this.state = { 
            tasks: [],
            nextId: null,
            isFetching: true,
            hasError: false
        }

        this.addTask = this.addTask.bind(this)
        this.setTaskStatus = this.setTaskStatus.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    }

    componentDidMount(){
        fetch("https://my-json-server.typicode.com/Eli-Sensei/ReactCourse/tasks")
        .then(res => res.json())
        .then(tasks => {
            this.setState({
                isFetching: false,
                tasks: tasks.map(task => ({
                    id: task.id,
                    label: task.title,
                    isDone: false
                })),
                nextId: Math.max(...tasks.map(task => task.id)) + 1
            })

        })
        .catch(() => {
            this.setState({
                isFetching: false,
                hasError: true
            })
        })
    }
    
    setTaskStatus(taskId, isDone) { 
        const tasks = this.state.tasks 
        const taskIndex = tasks.findIndex(t => t.id === taskId) 
        const tasksBefore = tasks.slice(0, taskIndex) 
        const tasksAfter = tasks.slice(taskIndex + 1)
        const newTask = tasks[taskIndex]
        newTask.isDone = isDone
        this.setState({ 
          tasks: [...tasksBefore, newTask, ...tasksAfter] 
        })
    } 

    addTask(label) {
        const newTask = {
            id: this.state.nextId,
            label,
            isDone: false
        }
        this.setState({
            nextId: this.state.nextId + 1, 
            tasks: [...this.state.tasks, newTask]
        })
    }

    deleteTask(taskId){
        const tasks = this.state.tasks 
        const taskIndex = tasks.findIndex(t => t.id === taskId) 
        const tasksBefore = tasks.slice(0, taskIndex) 
        const tasksAfter = tasks.slice(taskIndex + 1)
        this.setState({ 
          tasks: [...tasksBefore, ...tasksAfter] 
        })

        console.log(tasks[taskIndex])
    }

    render(){
        
        if(this.state.hasError)
        return <p>Oups, on dirait qu'une erreur s'est produite ^^"</p>
        
        if(this.state.isFetching)
        return <p>Chargement en cours....</p>

        return (
            <div>
                <h1>Tâches</h1>
                <TaskList 
                    tasks={this.state.tasks}
                    setTaskStatus={this.setTaskStatus}
                    deleteTask={this.deleteTask}
                />
                <TaskForm addTask={this.addTask} />
                <button onClick={()=>console.log(this.state.tasks)}>show tasks</button>
            </div>
        )
        
    }
}


export default App