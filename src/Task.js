import React from "react";
import PropTypes from "prop-types";
import "../public/Task.css"
import { taskShape } from "./shapes";

const Task = ({task, setTaskStatus, deleteTask}) => {
    return (
        <label className={"task"}>
            <input 
                type="checkbox" 
                checked={task.isDone}
                onChange={
                    event => {
                        
                        const isDone = event.target.checked
                        setTaskStatus(isDone)


                        // changement de couleur dynamic mais non généric
                        const taskLabel = event.target.parentElement.parentElement
                        if(isDone){
                            taskLabel.classList.add("task-item-checked")
                        }else{
                            taskLabel.classList.remove("task-item-checked")
                        }
                    }
                }
            />
            {task.label}
            <button 
                className="delete-btn"
                onClick={()=>{deleteTask(task.id)}}
            >Delete</button>
        </label>
    )
}

Task.propTypes = {
    task: taskShape.isRequired,
    setTaskStatus: PropTypes.func
}

Task.defaultProps = {
    setTaskStatus: () => {}
}

export default Task;