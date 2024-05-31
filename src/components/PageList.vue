<template>
    <aside class="left-side-menu">
        <h2>Jakub Rana</h2>
        <h3>{{ userIdOauth }}</h3>
        <section class="page-list">
            <button v-for="pageIdAndTitle in pageManagerStore.pageIdsAndTitles" :key="pageIdAndTitle.id"
                @click="pageManagerStore.openPage(pageIdAndTitle.id)">
                <img src="../assets/icons/document-text.svg" alt="page icon">
                <p>{{ pageIdAndTitle.title }}</p>
            </button>
        </section>
        <button @click="addPage">
            <p>Add page</p>
            <img src="../assets/icons/plus.svg" alt="Add page icon">
        </button>
    </aside>
</template>

<script setup>
import { usePageManagerStore } from "@/stores/pageManager";
import axios from "axios";

const pageManagerStore = usePageManagerStore();

async function addPage() {
    await axios.post("/page", { title: "Untitled page" });
    pageManagerStore.getNewPageIdsAndTitles();
}

let userIdOauth = localStorage.getItem('userIdOauth')

</script>

<style lang="scss" scoped>
aside.left-side-menu {
    display: flex;
    flex-direction: column;
    width: 20rem;

    padding: 6rem 2rem;

    h2 {
        margin-bottom: 2rem;
        font-size: 1.5rem;
        font-weight: 500;
        color: rgb(95, 95, 95);
    }

    section.page-list {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    button {
        width: 100%;
        background-color: transparent;
        border: none;
        text-align: left;
        padding: 0.5rem 1rem;
        font-size: 1.2rem;
        font-weight: 500;
        border-radius: 0.5rem;

        display: flex;
        align-items: center;
        gap: 1rem;

        cursor: pointer;

        transition: background-color 0.1s;

        &:hover {
            background-color: rgb(240, 240, 240);
        }

        img {
            width: 1.5rem;
            height: 1.5rem;
        }
    }
}
</style>
