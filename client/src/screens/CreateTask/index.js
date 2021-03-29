import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { httpClient } from '../../httpClient';
const CreateTask = () => {
    
    const [title, setTitle] = useState('welcome');
    const [date, setDate] = useState('');
    const history = useHistory();

    const submitData = () => {
        const formdata = {title, date};

        httpClient.post('/tasks', {...formdata})
            .then(response => {
                // handle next steps
                history.pushState('/tasks')
            })
        // url: /tasks
        // method: POST
        // data: formdata
    }

    const changeTitle = (event) => {
        const value = event.target.value;
        setTitle(value);
    }

    return <Form>
        title: <input onChange={changeTitle} className="form-control" type="text" value={title} />
        date: <input onChange={changeTitle} className="form-control" type="date" value={date} />
        title: <input onChange={changeTitle} className="form-control" type="text" value={title} />
        <Button onClick={submitData}>Submit</Button>
    </Form>;
    
}

export default CreateTask;