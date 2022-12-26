import React from 'react';
import Task from "./Task";
import PropTypes from "prop-types"
import { taskShape } from './shapes';

const TaskList = ({tasks, setTaskStatus, deleteTask}) => {
    // console.warn(tasks)
    return (
        <ul >
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

TaskList.PropTypes = {
    tasks: PropTypes.arrayOf(taskShape).isRequired,
    setTaskStatus: PropTypes.func,
    deleteTask: PropTypes.func
}

TaskList.defaultProps = {
    setTaskStatus: () => {},
    deleteTask: () => {},
}

export default TaskList;