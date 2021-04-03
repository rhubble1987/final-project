
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { httpClient } from '../../httpClient';



const EventBlock = () => {

    const [eventDate, setEventDate] = useState('');
    const [startTime, setStartTime] = useState(1);
    const [endTime, setEndTime] = useState(15);
    const user = JSON.parse(localStorage.getItem("user"))
    const history = useHistory();

    const submitData = () => {
        const formdata = {
           
            eventDate: eventDate,
            startTime: startTime,            
            userId: user.user.id
        }

        httpClient.post('/api/events', { ...formdata })
            .then(response => {
                // handle next steps
                console.log(response)
                history.push('/events')
            })
        
    }

    return <Form>
       Date: <input onChange={(e) => setEventDate(e.target.value)}  className="form-control" type="date" value={eventDate} />
       Start Time: <input onChange={(e) => setStartTime(e.target.value)}  className="form-control" type="time" name="time" id="time" value={startTime} />
       End Time: <input onChange={(e) => setEndTime(e.target.value)}  className="form-control" type="time" name="time" id="time" value={endTime} />
       

        <Button className="btn btn-dark btn-lg btn-block"  onClick={submitData}>Submit</Button>
    </Form>;

}

export default EventBlock;

