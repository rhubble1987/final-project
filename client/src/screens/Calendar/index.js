import React, {useState, useEffect} from "react";
import API from "../../util/API";
import ScheduleBlock from "../../components/ScheduleBlock";
import {requestWithJWT} from "../../httpClient";


function CalendarForToday() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
         mapEventsandTasks();
    }, []);

    function mapEventsandTasks() {
        let eventsAndTasks = [];
        const response = requestWithJWT();
        if (response) {
        API.getUserEvents(response[1].user.id)
        .then(userEvents => {
            eventsAndTasks = userEvents;
            API.getUserTasks(response[1].user.id)
            .then(userTasks => {
                eventsAndTasks = eventsAndTasks.push(userTasks);
                eventsAndTasks.sort(function(a,b) {
                    return a.startDate - b.startDate
                });
                setSchedule(eventsAndTasks);
            });
        }); 
        }
        
    };

    return (
        <div>
            {schedule.length ? (
                <div>
                    {schedule.map(scheduleBlock => {
                        return (
                            <ScheduleBlock key={scheduleBlock.name} scheduleBlock={scheduleBlock}/>
                        );

                    })}
                </div>
            ) : (
                <p>Nothing to work on today!</p> 
            )}
        </div>
    )

}

export default CalendarForToday;