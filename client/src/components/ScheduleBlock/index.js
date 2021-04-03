import React, {useState} from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { CloseButton } from 'react-bootstrap';

function ScheduleBlock(props) {
    console.log(props);
    const cls = "";

    if (moment().format('H') >= props.calculatedStartTime && moment().format('H') < props.calculatedEndTime) {
        cls = 'card text-white bg-success'  
    }

    if (moment().format('H') >= props.startTime && moment().format('H') < props.endTime) {
        cls = 'card text-white bg-danger'
    }
        if (props.scheduleBlock.scheduleType === 'task') {
            return (
                <div className={cls}>
                    <div className="card-body">
                        <p>{props.scheduleBlock.taskName} | <Moment format="h:mm">{props.scheduleBlock.startTime}</Moment> - <Moment format="h:mm">{props.scheduleBlock.endTime}</Moment></p>
                        <p>Priority: {props.scheduleBlock.calculatedPriority}</p>
                        <p>Due: {props.scheduleBlock.dueDate}</p>
                        <p>Notes: {props.scheduleBlock.note}</p>
                    </div>
                </div>
            )
        }

        if (props.scheduleBlock.scheduleType === 'event') {
            return (
                <div className={cls}>
                    <div className="card-body">
                        <p>{props.scheduleBlock.taskName} | Due: {props.scheduleBlock.dueDate}</p>
                        <p>Priority: {props.scheduleBlock.calculatedPriority}</p>
                        <p>Notes: {props.scheduleBlock.note}</p>
                    </div>
                </div>
            )
        }
        return null;
    }

    


export default ScheduleBlock;