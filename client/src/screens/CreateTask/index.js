import { useState, Col } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { httpClient } from '../../httpClient';
import { createPopper } from '@popperjs/core';
const CreateTask = () => {

    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [note, setNote] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.user.id);
  
    const history = useHistory();

    const submitData = () => {
        const formdata = {
            taskName: name,
            dueDate: dueDate,
            note: note,
            userId: user.user.id
        }

        httpClient.post('/api/tasks', { ...formdata })

            .then(response => {
                // handle next steps
                console.log(response)
                history.push('/api/tasks')
            })
        // url: /tasks
        // method: POST
        // data: formdata
    }
    return <Form>
        New Task: <input onChange={(e) => setName(e.target.value)} className="form-control"  type="text" value={name} />
        Due Date: <input onChange={(e) => setDueDate(e.target.value)}  className="form-control" type="date" value={dueDate} />

        

       


        <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Notes:</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e) => setNote(e.target.value)} value={note} />
        </Form.Group>


        <Button className="btn btn-dark btn-lg btn-block" onClick={submitData}>Submit</Button>
    </Form>;

}

export default CreateTask;

