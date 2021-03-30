import axios from "axios";

export default {
    getUserTasks: function() {
        return axios.get('/api/tasks', {
            userId: 1
        });
    },
    getUserEvents: function() {
        return axios.get('/api/events', {
            userId: 1
        }) 
    }
}