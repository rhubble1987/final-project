
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { httpClient } from '../../httpClient';



const EventBlock = () => {

    const [eventDate, setEventDate] = useState('');
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const user = JSON.parse(localStorage.getItem("user"))


    const submitData = () => {

        httpClient.post('/api/events', {
            date: eventDate,
            startTime: startTime,
            endTime: endTime,            
            userId: user.user.id
        })
            .then(() => {
              setEventDate("");
              setStartTime("");
              setEndTime("");
              alert("Event added!");
            });
        
    }

    return (
        <div className="card p-3">
    <Form>
       Date: <input onChange={(e) => setEventDate(e.target.value)}  className="form-control" type="date" value={eventDate} />
       <br/>
       Start Time: <input onChange={(e) => setStartTime(e.target.value)}  className="form-control" type="time" name="time" id="time" value={startTime} />
       <br/>
       End Time: <input onChange={(e) => setEndTime(e.target.value)}  className="form-control" type="time" name="time" id="time" value={endTime} />
       <br/>

        <Button className="btn btn-dark btn-lg btn-block"  onClick={submitData}>Submit</Button>
    </Form>
    </div>
    )

}

export default EventBlock;

