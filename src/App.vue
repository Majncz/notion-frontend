<template>
  <div class="page-wrapper" v-if="areDataLoaded">
    <PageTitle :data="Page.title.value.content" @titlechange="Page.changeTitle"/>
    <PageBlock v-for="blockKey in Page.getBlockKeys()" :key="blockKey" 
      :data="Page.getBlockData(blockKey)"
      @contentchange="(data) => Page.blockContentChange(data, blockKey)" 
      @newblock="(value) => Page.newBlock(blockKey, value)" />
  </div>
  <ContextMenu v-if="contextVisible" />
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { onBeforeMount, ref, onMounted, watch, VueElement, getCurrentInstance, computed } from "vue"
  import PageTitle from "@/components/page/PageTitle.vue";
  import PageBlock from "@/components/page/PageBlock.vue";
  import ContextMenu from "@/components/ContextMenu.vue";
  import { useContextStore } from "@/stores/context";
  import Page from "@/modules/Page.js";
  import { useGlobalStore } from "@/stores/global.js";

  const appInstance = getCurrentInstance();
  const globalStore = useGlobalStore();
  const areDataLoaded = ref(false);
  const contextStore = useContextStore();

  const contextVisible = computed(() => contextStore.visible);

  onMounted(async () => {
    try {
      const response = await fetch(`http://${globalStore.apiUrl}/page`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      new Page(data); // Update state here that your component depends on
      areDataLoaded.value = true;
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // this is extremely unoptimalised, you don't need to send the whole page data, we just need to send the specific change, put that will be done later when the database is ready
  watch(Page.blockList, () => {
    Page.postData();
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
