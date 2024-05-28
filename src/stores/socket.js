import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/global.js";
import { io } from "socket.io-client";

export const useSocketStore = defineStore("socket", () => {
    const socket = io(useGlobalStore().apiUrl, {
        query: {
            id: useGlobalStore().userId
        }
    });

    return {
        socket
    }
});

