import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/global.js";
import { io } from "socket.io-client";
import { usePageManagerStore } from "@/stores/pageManager.js";

export const useSocketStore = defineStore("socket", () => {
    const socket = io(useGlobalStore().apiUrl, {
        query: {
            id: useGlobalStore().userId
        }
    });

    // {
    //   item: "item",
    //   content: "content",
    //   pageId: "pageId",
    //   blockId: "blockId",
    //   date: new Date().getTime()
    // }
    console.log("GULAG1")
    socket.on("pageChange", (data) => {
        console.log("GULAG");
        if (usePageManagerStore().page == undefined || usePageManagerStore().page.id !== data.pageId) return;

        if (data.item === "title") {
            usePageManagerStore().page.title = data.content;
            usePageManagerStore().pageIdsAndTitles.find(page => page.id === data.pageId).title = data.content;
        } else if (data.item === "blockText") {
            usePageManagerStore().page.getBlockById(data.blockId).content = data.content;
            console.log(usePageManagerStore().page.getBlockById(data.blockId).content = data.content);
        } else if (data.item === "newBlock") {
            usePageManagerStore().page.pushBlock(data);
        } else if (data.item === "deleteBlock") {
            usePageManagerStore().page.removeBlock(data.blockId);
        }
    });

    return {
        socket
    }
});

