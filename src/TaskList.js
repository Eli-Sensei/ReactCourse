import React from 'react';
import Task from "./Task";

const TaskList = ({tasks, setTaskStatus, deleteTask}) => {
    // console.warn(tasks)
    return (
        <ul>
            {
                tasks.map(task => (
                    <li key={task.id} className={"task-item" + (task.isDone ? " task-item-checked" : "")}>
                        <Task 
                            task={task} 
                            setTaskStatus={isDone => {
                                setTaskStatus(task.id, isDone)
                                
                            }}
                            deleteTask={taskId => {
                                deleteTask(taskId)
                            }}
                        ></Task>
                    </li>
                ))
            }
        </ul>
    )
}

export default TaskList;