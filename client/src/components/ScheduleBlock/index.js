import React from 'react';
import moment from 'moment';

function ScheduleBlock(props) {
let cls = "";

    let startTime = moment().startOf('day').add(props.scheduleBlock.startTime,'minutes').format('h:mm A');
    let endTime = moment().startOf('day').add(props.scheduleBlock.endTime,'minutes').format('h:mm A');

    let startTime2 = moment().startOf('day').add(props.scheduleBlock.startTime,'minutes').format('H:mm');
    let endTime2 = moment().startOf('day').add(props.scheduleBlock.startTime,'minutes').format('H:mm');

        if (props.scheduleBlock.scheduleType === 'task') {
            let noteClass = "";
            if (!props.scheduleBlock.note) {
                noteClass = "d-none";
            }
            let dueDate = moment(props.scheduleBlock.dueDate.toString()).format('MM/DD/YYYY');
            if (moment().format('H:mm') >= startTime2 && moment().format('H:mm') < endTime2) {
                cls = 'card my-4 text-white bg-success'  
            } else {
                cls = 'card my-4';
            }
            return (
                <div className={cls}>
                    <h5 className="card-header">{startTime} - {endTime}</h5>
                    <div className="card-body">
                        <p>{props.scheduleBlock.taskName}</p>
                        <p>Priority: {props.scheduleBlock.calculatedPriority}</p>
                        <p>Due: {dueDate}</p>
                        <p className={noteClass}>Notes: {props.scheduleBlock.note}</p>
                    </div>
                </div>
            )
        }

        if (props.scheduleBlock.scheduleType === 'event') {
            if (moment().format('H:mm') >= startTime2 && moment().format('H:mm') < endTime2) {
                cls = 'card my-4 text-white bg-danger'  
            } else {
                cls = 'card my-4';
            }
            return (
                <div className={cls}>
                    <h5 className="card-header">{startTime} - {endTime}</h5>
                    <div className="card-body">
                        <p>This time is blocked off for an event!</p>
                    </div>
                </div>
            )
        }
        return null;
    }

    


export default ScheduleBlock;