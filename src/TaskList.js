import React from 'react';
import Task from "./Task";

const TaskList = ({tasks}) => {
    // console.warn(tasks)
    return (
        <ul>
            {
                tasks.map(task => (
                    <li key={task.id}>
                        <Task task={task}></Task>
                    </li>
                ))
            }
        </ul>
    )
}

export default TaskList;