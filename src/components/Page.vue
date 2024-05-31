<template>
    <div class="page-wrapper" v-if="areDataLoaded">
        <PageTitle :data="page.title" :pageId="page.id" />
        <section class="page-blocks">
            <PageBlock v-for="block in page.blockList" :key="block.id" :blockId="block.id" v-model="page" />
        </section>
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
import { useSocketStore } from "@/stores/socket.js";

useSocketStore();

const appInstance = getCurrentInstance();
const globalStore = useGlobalStore();
const areDataLoaded = ref(false);
const contextStore = useContextStore();
const pageManagerStore = usePageManagerStore();

const contextVisible = computed(() => contextStore.visible);

const page = ref(null);

watch(() => pageManagerStore.page, () => {
    page.value = pageManagerStore.page;
    areDataLoaded.value = true;
}, { deep: true })

watch(page, (newVal) => {
    console.log("LALALALA ", newVal);
}, { deep: true });

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
    gap: 2rem;

    section.page-blocks {
        display: flex;
        flex-direction: column;
        gap: 0rem;
    }
}
</style>