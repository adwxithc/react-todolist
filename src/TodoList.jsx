
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'

import React,{useState,useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import ListItem from './List-Item'


function TodoList(props){
    const {
        screeningTaskType,
        setTasks,
        tasks

    }=props
    const [editingTaskId,setEditingTaskId]=useState('')
    const [editingTaskText,setEditingTaskText]=useState('')
    const [newTask, setNewTask]= useState('')
    const [feedback,setFeedback]= useState('')

    useEffect(()=>{
        
        const savedTodo=JSON.parse(localStorage.getItem('todoList'))
        if(savedTodo){
            setTasks(savedTodo)

        }
        
    },[])



    const handleInputChange=(e)=>{
        setNewTask(e.target.value)
    }
    const handleAddTask=(e)=>{
        e.preventDefault()
        if(newTask.trim()!==''){
            const newTodo=[...tasks,{name:newTask,isCompleted:false,id:uuidv4()}]
            localStorage.setItem('todoList',JSON.stringify(newTodo))
            setTasks(newTodo)
            setNewTask('')
        }else{
            setFeedback('type something..')
            setTimeout(()=>{
            setFeedback('')

            },2000)
        }
    }
    const handleDeleteTask=(id)=>{
        const newTasks=tasks.filter((t,i)=>t.id!==id)
        localStorage.setItem('todoList',JSON.stringify(newTasks))
        setTasks(newTasks)
        

    }
    const handleCompletion=(id)=>{
        const now=new Date()
        const completedOn=now.toLocaleString();


        setTasks((prevTask)=>{
            const updatedTask=prevTask.map((t,i)=>t.id==id?{...t,isCompleted:!t.isCompleted,completedOn}:t)
            localStorage.setItem('todoList',JSON.stringify(updatedTask))
            return updatedTask

        })


    }

    const moveTaskUp=(index)=>{
        const updatedTask =[...tasks]
        if(index>0){
            

            [ updatedTask[index], updatedTask[index-1] ]=
            [ updatedTask[index-1], updatedTask[index] ]

            localStorage.setItem('todoList',JSON.stringify(updatedTask))
            setTasks(updatedTask)
            

        }

    }
    const moveTaskDown=(index)=>{
        const updatedTask =[...tasks]
        if(index<tasks.length-1){
            

            [updatedTask[index], updatedTask[index+1]]=
            [updatedTask[index+1], updatedTask[index]]
            
            localStorage.setItem('todoList',JSON.stringify(updatedTask))
            setTasks(updatedTask)


        }
        
    }
    const handleEditTask=(id,index)=>{
        setEditingTaskId(id)
        setEditingTaskText(tasks[index].name)
    }
    const handleUpdateTask=(id)=>{
        setTasks((prevTask)=>{
            const updatedTask=prevTask.map(t=>t.id==id?{...t,name:editingTaskText}:t)
            localStorage.setItem('todoList',JSON.stringify(updatedTask))
            return updatedTask
        })
        setEditingTaskId('')
    }
    

    let taskList=[]
    if(screeningTaskType=='all'){
        taskList=tasks
    }else if(screeningTaskType=='completed'){
        taskList=tasks.filter(t=>t.isCompleted==true)
    }else{
        taskList=tasks.filter(t=>t.isCompleted==false)

    }
    return(
        <div className='to-do-list'>
            <h4>{new Date().toLocaleString()}</h4>
            {screeningTaskType=='all'&&(
            <form onSubmit={handleAddTask}>
            <div className='task-input'>
                <input 
                type="text" 
                placeholder="Enter a task"
                onChange={handleInputChange}
                value={newTask}
                />
                <button
                type='submit'
                className='add-button'
                > <FontAwesomeIcon icon={faPlus} /> </button>
            </div>
            <div className='feedback'>{feedback}</div>
            </form>
            )}

            <ol>
                {taskList.map((task,index)=>
                
                    <ListItem 
                    task={task}
                    index={index}
                    handleUpdateTask={handleUpdateTask}
                    handleEditTask={handleEditTask}
                    moveTaskDown={moveTaskDown}
                    moveTaskUp={moveTaskUp}
                    handleCompletion={handleCompletion}
                    handleDeleteTask={handleDeleteTask}
                    editingTaskId={editingTaskId}
                    editingTaskText={editingTaskText}
                    setEditingTaskText={setEditingTaskText}
                    screeningTaskType={screeningTaskType}
                    key={index}
                    />
                )}
            </ol>
        </div>
    )
}
export default TodoList