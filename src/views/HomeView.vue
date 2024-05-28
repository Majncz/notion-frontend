<template>
    <div class="page-wrapper" v-if="areDataLoaded">
        <PageTitle :data="page.title" :pageId="page.id" />
        <PageBlock v-for="blockKey in page.getBlockKeys()" :key="blockKey" :data="page.getBlockData(blockKey)"
            @contentchange="(data) => page.blockContentChange(data, blockKey)"
            @newblock="(value) => page.newBlock(blockKey, value)" />
    </div>
    <ContextMenu v-if="contextVisible" />
</template>

<script setup>
import { onBeforeMount, ref, onMounted, watch, VueElement, getCurrentInstance, computed } from "vue"
import PageTitle from "@/components/page/PageTitle.vue";
import PageBlock from "@/components/page/PageBlock.vue";
import ContextMenu from "@/components/ContextMenu.vue";
import { useContextStore } from "@/stores/context";
import { useGlobalStore } from "@/stores/global.js";
import { usePageManagerStore } from "@/stores/pageManager.js";


const appInstance = getCurrentInstance();
const globalStore = useGlobalStore();
const areDataLoaded = ref(false);
const contextStore = useContextStore();
const pageManagerStore = usePageManagerStore();

const contextVisible = computed(() => contextStore.visible);

let page = pageManagerStore.pages[0];

watch(() => pageManagerStore.pages[0], () => {
    page = pageManagerStore.pages[0];
    console.log("page changed: ", page);
    areDataLoaded.value = true;
}, { deep: true })

document.addEventListener("mousemove", (event) => {
    appInstance.appContext.config.globalProperties.mousePosition.x = event.clientX;
    appInstance.appContext.config.globalProperties.mousePosition.y = event.clientY;
})
</script>

<style lang="scss" scoped>
div.page-wrapper {
    width: 100%;
    max-width: 1200px;
    padding-bottom: 20rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>