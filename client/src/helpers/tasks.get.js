const baseURL = 'http://localhost:3005/api';

const getTasks = () => {
    return fetch(`${baseURL}/tasks?userId=${userId}`);
};