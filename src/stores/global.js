import { defineStore } from "pinia";

export const useGlobalStore = defineStore('global', {
    state: () => ({
        apiUrl: 'localhost:3001'
    })
})

