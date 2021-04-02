import React, {useState, useEffect} from "react";
import API from "../../util/API";
import ScheduleBlock from "../../components/ScheduleBlock";

function CalendarForToday() {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
         mapEventsandTasks();
    }, []);

    function mapEventsandTasks() {
        let eventsAndTasks = [];
        API.getUserEvents()
        .then(userEvents => {
            eventsAndTasks = userEvents;
            API.getUserTasks
            .then(userTasks => {
                eventsAndTasks = eventsAndTasks.push(userTasks);
                eventsAndTasks.sort(function(a,b) {
                    return a.startDate - b.startDate
                });
                setSchedule(eventsAndTasks);
            });
        }); 
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