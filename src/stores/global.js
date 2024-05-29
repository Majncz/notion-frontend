import { defineStore } from "pinia";

export const useGlobalStore = defineStore('global', {
    state: () => ({
        apiUrl: 'http://localhost:8080/ranajakub/fotionapi',
        userId: localStorage.getItem('userId') || "8bcae52d-8b44-4be8-8c83-df07be564f25"
    })
})

