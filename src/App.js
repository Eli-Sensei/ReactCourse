import React, {Component} from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList"


class App extends Component {
    constructor(props){
        super(props)
        this.state = { 
            nextId: 6,
            tasks: [
                {id: 0, label: "faire caca maintenant", isDone: false},
                {id: 1, label: "chercher le petit", isDone: false},
                {id: 2, label: "lacher une caisse", isDone: true},
                {id: 3, label: "faire a manger", isDone: true},
                {id: 4, label: "faire mon sport", isDone: false},
                {id: 5, label: "faire du yoga", isDone: true},
            ]
        }

        this.addTask = this.addTask.bind(this)
        this.setTaskStatus = this.setTaskStatus.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
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


    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users/10/todos")
        .then(res => res.json())
        .then(tasks => {
            this.setState({
                tasks: tasks.map(task => ({
                    id: task.id,
                    label: task.title,
                    isDone: false
                })),
                nextId: Math.max(...tasks.map(task => task.id)) + 1
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
        // console.log(this.state.tasks)
        return (
            <div>
                <h1>Tâches</h1>
                <TaskList tasks={this.state.tasks} setTaskStatus={this.setTaskStatus} deleteTask={this.deleteTask}/>
                <TaskForm addTask={this.addTask} />
                <button onClick={()=>console.log(this.state.tasks)}>show tasks</button>
            </div>
        )
        
    }
}


export default App