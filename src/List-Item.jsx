import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons'
import './index.css'
function ListItem(props){

    const{
        task,
        index,
        handleUpdateTask,
        handleEditTask,
        moveTaskDown,
        moveTaskUp,
        handleCompletion,
        handleDeleteTask,
        editingTaskId,
        editingTaskText,
        setEditingTaskText,
        screeningTaskType

    }=props

    return(
        <li key={index} className='single-task'>
        {editingTaskId==task.id?(
            <>
            <input value={editingTaskText} onChange={(e)=>setEditingTaskText(e.target.value)} type='text' />
            <button className='save-task'
            onClick={()=>handleUpdateTask(task.id)}
            >Save</button>
            </>
        ):(
            <>
            <label className={`text  `} htmlFor={index}>
            <input type='checkbox' id={index} onClick={()=>handleCompletion(task.id)} checked={task.isCompleted && true}/>
            <span className={`${task.isCompleted && 'compleated'}`}>{task.name}</span>
            {task.isCompleted && <p ><small className='completed-time'>Completed on {task.completedOn}</small></p>}
            
            </label>

            {
            screeningTaskType=='all' &&
            <>
            <button
            className='move-button'
            onClick={()=>moveTaskUp(index)}>
                <FontAwesomeIcon icon={faUpLong} />
            </button>
            <button
            className='move-button'
            onClick={()=>moveTaskDown(index)}>
                <FontAwesomeIcon icon={faDownLong} />

            </button>
            </>
            }
            
            <button
            className='delete-button'
            onClick={()=>handleDeleteTask(task.id)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className='edit-button' 
            onClick={()=>handleEditTask(task.id,index)}
            >Edit</button>
           
            </>
        )}


        
    </li>
    )
}

export default ListItem