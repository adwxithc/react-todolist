import React from "react";
import './index.css'
function FilterTasks(props){
    const {
        screeningTaskType,
        onAction
    }=props
    return(
        <div className="leftBar">
            <div className="main-title">TODO</div>
            <ol>
                <li className={`filter-option ${screeningTaskType==='all'&&'choosen-option'}`} onClick={()=>onAction('all')} >All</li>
                <li className={`filter-option ${screeningTaskType==='completed'&&'choosen-option'}`} onClick={()=>onAction('completed')} >Completed</li>
                <li className={`filter-option ${screeningTaskType==='pending'&&'choosen-option'}`} onClick={()=>onAction('pending')} >Pending</li>
              
            </ol>
        </div>
    )
}

export default FilterTasks