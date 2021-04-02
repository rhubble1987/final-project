import React, {useState} from 'react';
import Moment from 'react-moment';
import moment from 'moment';

function ScheduleBlock(props) {
    const [taskState, setTaskState] = useState('card');
    const [eventState, setEventState] = useState('card');

    if (moment().format('H') >= props.calculatedStartTime && moment().format('H') < props.calculatedEndTime) {
        setTaskState('card text-white bg-success');   
    }

    if (moment().format('H') >= props.startTime && moment().format('H') < props.endTime) {
        setEventState('card text-white bg-danger');
    }
        if (props.type === 'task') {
            
            return (
                <div className={taskState}>
                    <div className="card-body">
                        <p>{props.taskName} | <Moment format="h:mm">{props.calculatedStartTime}</Moment> - <Moment format="h:mm">{props.calculatedEndTime}</Moment></p>
                        <p>Priority: {props.calculatedPriority}</p>
                        <p>Due: {props.dueDate}</p>
                        <p>Notes: {props.note}</p>
                    </div>
                </div>
            )
        }
        if (props.type === 'event') {
            return (
                <div className={eventState}>
                    <div className="card-body">
                        <p>{props.taskName} | Due: {props.dueDate}</p>
                        <p>Priority: {props.calculatedPriority}</p>
                        <p>Notes: {props.note}</p>
                    </div>
                </div>
            )
        }
    }


export default ScheduleBlock;