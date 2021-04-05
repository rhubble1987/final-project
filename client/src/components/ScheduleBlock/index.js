import React from 'react';
import moment from 'moment';

function ScheduleBlock(props) {
    const cls = "";

    if (moment().format('H') >= props.calculatedStartTime && moment().format('H') < props.calculatedEndTime) {
        cls = 'card text-white bg-success'  
    }

    if (moment().format('H') >= props.startTime && moment().format('H') < props.endTime) {
        cls = 'card text-white bg-danger'
    }

    
    
    let startTime = moment().startOf('day').add(props.scheduleBlock.startTime,'minutes').format('h:mm A');
    let endTime = moment().startOf('day').add(props.scheduleBlock.endTime,'minutes').format('h:mm A');
    


    
        if (props.scheduleBlock.scheduleType === 'task') {
            let dueDate = moment(props.scheduleBlock.dueDate.toString()).format('MM/DD/YYYY');
            return (
                <div className={cls}>
                    <h5 className="card-header">{startTime} - {endTime}</h5>
                    <div className="card-body">
                        <p>{props.scheduleBlock.taskName}</p>
                        <p>Priority: {props.scheduleBlock.calculatedPriority}</p>
                        <p>Due: {dueDate}</p>
                        <p>Notes: {props.scheduleBlock.note}</p>
                    </div>
                </div>
            )
        }

        if (props.scheduleBlock.scheduleType === 'event') {
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