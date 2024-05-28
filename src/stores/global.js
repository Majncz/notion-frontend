import { defineStore } from "pinia";

export const useGlobalStore = defineStore('global', {
    state: () => ({
        apiUrl: 'http://localhost:8080/ranajakub/fotionapi',
        userId: 'f38bfb7a-7d73-4026-a983-bed79d905a5d'
    })
})

