import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { httpClient } from '../../httpClient';
import moment from 'moment';


const CreateTask = () => {

    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [note, setNote] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));
  

    const submitData = () => {
        httpClient.post('/api/tasks/', {
            userId: user.user.id,
            taskName: name,
            dueDate: moment(dueDate).format('YYYYMMDD'),
            note: note
        })
            .then(() => {
                setName('');
                setDueDate('');
                setNote('');
                alert('Task saved!');
            });
    }
    return (
    <div className="card p-3"> 
    <Form>
        New Task: <input onChange={(e) => setName(e.target.value)} className="form-control"  type="text" value={name} />
        <br/>
        Due Date: <input onChange={(e) => setDueDate(e.target.value)}  className="form-control" type="date" value={dueDate} />
        <br/>
        <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Notes:</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e) => setNote(e.target.value)} value={note} />
        </Form.Group>
        <br/>
        <Button className="btn btn-dark btn-lg btn-block" onClick={submitData}>Submit</Button>
    </Form>
    </div>
    )

}

export default CreateTask;

