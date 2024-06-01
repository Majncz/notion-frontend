<template>
    <aside class="left-side-menu">
        <h2>{{ globalStore.user.name }}</h2>
        <section class="page-list">
            <button v-for="pageIdAndTitle in pageManagerStore.pageIdsAndTitles" :key="pageIdAndTitle.id"
                @click="pageManagerStore.openPage(pageIdAndTitle.id)">
                <img src="../assets/icons/document-text.svg" alt="page icon">
                <p>{{ pageIdAndTitle.title }}</p>
            </button>
        </section>
        <button @click="addPage">
            <img src="../assets/icons/plus.svg" alt="Add page icon">
            <p>Add page</p>
        </button>
        <button @click="signOut">
            <img src="../assets/icons/logout.svg" alt="Sign out icon">
            <p>Sign out </p>
        </button>
    </aside>
</template>

<script setup>
import { usePageManagerStore } from "@/stores/pageManager";
import { useGlobalStore } from "@/stores/global";
import axios from "axios";
import router from "@/router";

const pageManagerStore = usePageManagerStore();
const globalStore = useGlobalStore();

async function addPage() {
    await axios.post("/page", { title: "Untitled page" });
    pageManagerStore.getNewPageIdsAndTitles();
}
function signOut(){
    localStorage.removeItem('user');
    window.location.href = '/signin';
}

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
