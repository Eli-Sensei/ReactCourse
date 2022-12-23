import React from 'react';
import Task from "./Task";

const TaskList = ({tasks, setTaskStatus}) => {
    // console.warn(tasks)
    return (
        <ul>
            {
                tasks.map(task => (
                    <li key={task.id}>
                        <Task task={task} setTaskStatus={isDone => setTaskStatus(task.id, isDone)}></Task>
                    </li>
                ))
            }
        </ul>
    )
}

export default TaskList;