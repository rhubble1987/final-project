import React, {useState, useEffect} from "react";
import API from "../../util/API";

function CalendarForToday() {
    const [eventBlocks, setEventBlocks] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
         mapEventsandTasks();
    }, []);

    function mapEventsandTasks() {
        API.getUserEvents()
        .then(userEvents => {
            API.getUserTasks
            .then(userTasks => {
                setEventBlocks(userEvents);
                setTasks(userTasks);
            });
        }); 
    };

    return (
        <div className="card">
            <div className="card-body">
                <table className="table">
                    <tbody className="table-hover">
                        <tr>
                            <th scope="row">9am</th>
                            <tr>
                                <td>Task 1</td>
                            </tr>
                            <tr>
                                <td>Task 2</td>
                            </tr>
                        </tr>
                        <tr>
                            <th scope="row">10am</th>
                        </tr>
                        <tr>
                            <th scope="row">11am</th>
                        </tr>
                        <tr>
                            <th scope="row">12pm</th>
                        </tr>
                        <tr>
                            <th scope="row">1pm</th>
                        </tr>
                        <tr>
                            <th scope="row">2pm</th>
                        </tr>
                        <tr>
                            <th scope="row">3pm</th>
                        </tr>
                        <tr>
                            <th scope="row">4pm</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    )

}

export default CalendarForToday;