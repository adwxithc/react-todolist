
import TodoList from './TodoList'
import TaskCount from './TaskCount'
import FilterTasks from './FilterTasks'
import React,{useState} from 'react'

function App() {
  const [screeningTaskType,setScreeningTaskType]=useState('all')
  
  const [tasks, setTasks]=useState([])

  const handleFilterChange=(value)=>{
    setScreeningTaskType(value)
  }

  return (
    <div className='container'>
    <FilterTasks onAction={handleFilterChange} screeningTaskType={screeningTaskType} />
    <TodoList  screeningTaskType={screeningTaskType} tasks={tasks} setTasks={setTasks}/>
    <TaskCount tasks={tasks}/>

   
    </div>
   
  )
}

export default App
