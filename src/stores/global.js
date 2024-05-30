import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';

export const useGlobalStore = defineStore('global', () => {
    function generateUUID() {
        return uuidv4();
    }

    return {
        apiUrl: 'http://localhost:8080/ranajakub/fotionapi',
        userId: localStorage.getItem('userId') || "8bcae52d-8b44-4be8-8c83-df07be564f25",
        generateUUID
    }
})

