import React, {useState, useEffect} from "react";
import API from "../../util/API";

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
                setSchedule(eventsAndTasks);
            });
        }); 
    };

    return (
        <div className="card">
            <div className="card-body">
                <table className="table table-hover">
                    {}
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
        
    )

}

export default CalendarForToday;