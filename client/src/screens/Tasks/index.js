import React, {useState, useEffect} from "react";
import Task from "../../components/Task";
import {httpClient} from "../../httpClient";

function Tasks() {
    const user = JSON.parse(localStorage.getItem('user'));
       
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks();
    }, []);

    function getTasks() {
        httpClient.get('/api/tasks/alltasks/' + user.user.id)
        .then((allOfAUsersTasks) => {
            console.log(allOfAUsersTasks.data);
            setTasks(allOfAUsersTasks.data);
        });
       
    }

    return (
        <div>
            {tasks.length ? (
                <div>
                    {tasks.map(task => {
                        return (
                            <Task key={task.taskName} task={task}/>
                        );

                    })}
                </div>
            ) : (
                <p>Nothing to work on it seems??</p> 
            )}
        </div>
    )
}

export default Tasks;