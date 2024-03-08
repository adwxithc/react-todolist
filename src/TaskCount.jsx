import React from "react";
import './index.css'
function TaskCount(props){
    const {
        tasks
    }=props
    const totalTask=tasks.length
    const completedTasks=tasks.reduce((a,c)=>{
        if(c.isCompleted)
        a++
    return a
    },0)
    const pevdingTasks=tasks.reduce((a,c)=>{
        if(!c.isCompleted)
        a++
    return a
    },0)
    const completionRate=(completedTasks/totalTask)*100
    return(
        <div className="RightBar">
            <h4 className="task-over-view-heading">Task Overview</h4>
            <ol>
                <li className="task-metrics"><span>Total Tasks</span> {totalTask}</li>
                <li className="task-metrics"><span>Compleated Tasks</span> {completedTasks}</li>
                <li className="task-metrics"> <span>Pending Tasks</span>  {pevdingTasks}</li>
                <li className="task-metrics"> <span>Completion rate</span> {!isNaN(completionRate)?`${completionRate.toFixed(2)}%`:''}</li>


            </ol>
        </div>
    )
}

export default TaskCount