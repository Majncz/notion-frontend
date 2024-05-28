import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import Page from "@/modules/Page.js";

export const usePageManagerStore = defineStore("pageManager", () => {
    const pages = ref([]);
    const pageIdsAndTitles = ref([]); // [{ id: "123", title: "title" }]

    (async () => {
        pageIdsAndTitles.value = (await axios.get("/page")).data;
        // console.log(pageIdsAndTitles.value);
        // console.log(pageIdsAndTitles.value[0]);

        pages.value.push(new Page((await axios.get(`/page/${pageIdsAndTitles.value[0].id}`)).data)); // this will load dynamicly based on the page you are opening in the future
        console.log("pages: ", pages.value);
    })();

    function getPageById(id) {
        return pages.value.find((page) => page.id === id);
    }

    return {
        pages,
        pageIdsAndTitles,
        getPageById
    };
});

