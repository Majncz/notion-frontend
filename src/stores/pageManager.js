import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import Page from "@/modules/Page.js";

export const usePageManagerStore = defineStore("pageManager", () => {
    const page = ref();
    const pageIdsAndTitles = ref([]); // [{ id: "123", title: "title" }]

    (async () => {
        pageIdsAndTitles.value = (await axios.get("/page")).data;
        // console.log(pageIdsAndTitles.value);
        // console.log(pageIdsAndTitles.value[0]);

        page.value = new Page((await axios.get(`/page/${pageIdsAndTitles.value[0].id}`)).data); // this will load dynamicly based on the page you are opening in the future
        console.log("page: ", page.value);
    })();

    async function openPage(pageId) {
        page.value = new Page((await axios.get(`/page/${pageId}`)).data);
    }

    async function getNewPageIdsAndTitles() {
        pageIdsAndTitles.value = (await axios.get("/page")).data;
    }

    return {
        page,
        pageIdsAndTitles,
        openPage,
        getNewPageIdsAndTitles
    };
});

