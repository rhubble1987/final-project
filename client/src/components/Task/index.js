import React from "react";
import moment from 'moment';
import {httpClient} from '../../httpClient';

function Task(props) {

function completeTask() {
    const user = JSON.parse(localStorage.getItem('user'));
    httpClient.put('/api/tasks/complete', {
        id: props.task.id,
        userId: user.user.id
    })
    .then(() => {
        window.location.reload();
    });

}

let dueDate = moment(props.task.dueDate.toString()).format("MM/DD/YYYY");

let noteClass = "";

if (!props.task.note) {
    noteClass = "d-none";
}

    return (
        <div className="card my-4">
            <h5 className="card-header">Priority {props.task.calculatedPriority}</h5>
            <div className="card-body text-wrap">
                <p>Task: {props.task.taskName}</p>
                <p className="font-weight-bold">Due: {dueDate}</p>
                <p className={noteClass}>Notes: {props.task.note}</p>
                <button type="button" className="btn btn-success" onClick={completeTask} data-complete={props.task.id}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"></path>
                </svg>
              </button>
            </div>
        </div>
    )
}

export default Task;