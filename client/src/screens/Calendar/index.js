import React, {useState, useEffect} from "react";
import ScheduleBlock from "../../components/ScheduleBlock";
import { httpClient } from '../../httpClient';


function CalendarForToday() {
    let user = JSON.parse(localStorage.getItem('user'));
       
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
         mapEventsandTasks();
    }, []);

    function mapEventsandTasks() {
        

        Promise.all([
            httpClient.get('/api/events/' + user.user.id),
            httpClient.get('/api/tasks/' + user.user.id)
        ])
        .then((results)=> {
            console.log(results);
            let eventsAndTasks = [];
            for (let i = 0; i < results[0].data.length; i++) {
                eventsAndTasks.push(results[0].data[i]);
            }
            for (let j = 0; j < results[1].data.length; j++) {
                eventsAndTasks.push(results[1].data[j]);
            }
            eventsAndTasks.sort(function(a,b) {
                   return a.startDate - b.startDate
                });
            console.log(eventsAndTasks);
            setSchedule(eventsAndTasks);
        })
        .catch(err => {console.log(err)});
    };

    

    return (
        <div>
            {schedule.length ? (
                <div>
                    {schedule.map(scheduleBlock => {
                        let key = scheduleBlock.scheduleType + scheduleBlock.id;
                        return (
                            <ScheduleBlock key={key} scheduleBlock={scheduleBlock}/>
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