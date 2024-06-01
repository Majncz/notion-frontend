import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';

export const useGlobalStore = defineStore('global', () => {
    console.log("Proc kurva")
    function generateUUID() {
        return uuidv4();
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    if ((user == undefined || user == "null") && window.location.pathname != '/signin' && window.location.pathname != '/callback') window.location.href = '/signin';

    //const userId = user.id;
    const apiUrl = 'http://localhost:8080/ranajakub/fotionapi';

    return {
        apiUrl,
        user,
        userId,
        generateUUID
    }
})

