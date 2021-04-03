import axios from "axios";
import { UserBindingContext } from "twilio/lib/rest/chat/v2/service/user/userBinding";

export default {
    getUserTasks: function(userId) {
        return axios.get('/tasks', {
            userId: userId.id
        });
    },
    getUserEvents: function(userId) {
        return axios.get('/events', {
            userId: userId.id
        }); 
    },
    updateUserTask: function(taskInfo) {
        return axios.put('/tasks', {
            id: taskInfo.id,
            taskName: taskInfo.taskName,
            dueDate: taskInfo.dueDate,
            note: taskInfo.note,
            isComplete: taskInfo.isComplete 
        });
    }
}