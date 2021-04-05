
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { httpClient } from '../../httpClient';



const EventBlock = () => {

    const [eventDate, setEventDate] = useState('');
    const [startTime, setStartTime] = useState(1);
    const [endTime, setEndTime] = useState(15);
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
              setStartTime(1);
              setEndTime(15);
              alert("Event added!");
            });
        
    }

    return <Form>
       Date: <input onChange={(e) => setEventDate(e.target.value)}  className="form-control" type="date" value={eventDate} />
       Start Time: <input onChange={(e) => setStartTime(e.target.value)}  className="form-control" type="time" name="time" id="time" value={startTime} />
       End Time: <input onChange={(e) => setEndTime(e.target.value)}  className="form-control" type="time" name="time" id="time" value={endTime} />
       

        <Button className="btn btn-dark btn-lg btn-block"  onClick={submitData}>Submit</Button>
    </Form>;

}

export default EventBlock;

