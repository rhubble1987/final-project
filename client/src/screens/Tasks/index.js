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
                <div id="nada">
                    <p className="text-center">Nothing to work on? Lucky you!</p>
                </div>
            )}
        </div>
    )
}

export default Tasks;