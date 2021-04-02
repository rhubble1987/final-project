import axios from "axios";

export default {
    getUserTasks: function(userId) {
        return axios.get('/api/tasks', {
            userId: userId
        });
    },
    getUserEvents: function(userId) {
        return axios.get('/api/events', {
            userId: userId
        }) 
    }
}