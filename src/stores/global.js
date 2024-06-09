import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';

export const useGlobalStore = defineStore('global', () => {
    console.log("Proc kurva")
    function generateUUID() {
        return uuidv4();
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    if ((user == undefined || user == "null") && window.location.pathname != '/signin' && window.location.pathname != '/callback') window.location.href = '/signin';

    //const userId = user.id;
    const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:8080/ranajakub/fotionapi' : 'https://fotionapi.ranajakub.com';
    const socketUrl = window.location.hostname === 'localhost' ? 'http://localhost:8080/ranajakub/fotionapi' : 'https://fotionapi.ranajakub.com/ranajakub/fotionapi';
    //const apiUrl = 'https://fotionapi.ranajakub.com';

    const usersModalVisible = ref(false);

    return {
        apiUrl,
        user,
        userId,
        generateUUID,
        usersModalVisible
    }
})

