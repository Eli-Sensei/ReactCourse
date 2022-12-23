import React, {Component} from "react";
import "../public/Task.css"

const Task = ({task, setTaskStatus}) => {
    return (
        <div>
            <span className="task">{task.label}</span>
            <input 
                type="checkbox" 
                checked={task.isDone}
                onChange={
                    event => {
                        const isDone = event.target.checked
                        setTaskStatus(isDone)
                    }
                }
            />
        </div>
    )
}   
export default Task;