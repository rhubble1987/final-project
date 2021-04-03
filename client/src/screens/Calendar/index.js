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
                console.log('a loop');
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



        //httpClient.get('/api/events', {data: {userId: user.user.id}})
        //.then(userEvents => {
        //    console.log(userEvents);
        //   /*  for (i = 0; i < userEvents.length; i++) {
        //        eventsAndTasks.push(userEvents[i]);
        //    } *///
 
        //    return httpClient.get('/api/tasks', {data: {userId: user.user.id}})
        
        //})
        //.then(userTasks => {
        //    /*for (j = 0; j < userTasks.length; j++) {
        //        eventsAndTasks.push(userTasks[j]);
        //    }
        //    eventsAndTasks.sort(function(a,b) {
        //        return a.startDate - b.startDate
        //    });
        //    history.push('/api/tasks'); */

        //    console.log(userTasks);
            //setSchedule(eventsAndTasks);
       // })
        
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