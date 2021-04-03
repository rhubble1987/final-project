import React, {useState, useEffect} from "react";
import API from "../../util/API";
import ScheduleBlock from "../../components/ScheduleBlock";


function CalendarForToday() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
         mapEventsandTasks();
    }, [mapEventsandTasks()]);

    function mapEventsandTasks() {
        let eventsAndTasks = [];
        console.log(user.user.id);
        API.getUserEvents(user.user.id)
        .then(userEvents => {
            console.log(userEvents);
            /* for (i = 0; i < userEvents.length; i++) {
                eventsAndTasks.push(userEvents[i]);
            } */
            API.getUserTasks(user.user.id)
            .then(userTasks => {
                console.log(userTasks);
                /* for (j = 0; j < userTasks.length; j++) {
                    eventsAndTasks.push(userTasks[j]);
                }
                eventsAndTasks.sort(function(a,b) {
                    return a.startDate - b.startDate
                });
                setSchedule(eventsAndTasks); */
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