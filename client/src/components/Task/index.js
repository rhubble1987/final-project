import React from "react";
import Moment from 'react-moment';

function Task(props) {

function completeTask(event) {
    /* event.preventDefault();
    let taskInfo = {
        id: props.task.id,
        taskName: props.task.taskName,
        dueDate: props.task.tdueDate,
        note: props.task.note,
        isComplete: true
    }
    API.updateUserTask(taskInfo)
    .then(() => {
        window.location.reload();
    }); */

}

    return (
        <div className="card">
            <div className="card-body">
                <p>{props.task.taskName} | Priority | Due: <Moment parse="YYYYMMDD" format="MM/DD/YYYY">{props.task.dueDate}</Moment></p>
                <p>Notes: {props.task.note}</p>
                <button type="button" className="btn btn-secondary" onClick={completeTask} data-complete={props.task.id}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"></path>
                </svg>
              </button>
            </div>
        </div>
    )
}

export default Task;