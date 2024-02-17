<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { onBeforeMount, ref, onMounted, watch, VueElement, getCurrentInstance } from "vue"
  import PageTitle from "@/components/page/PageTitle.vue";
  import PageBlock from "@/components/page/PageBlock.vue";
  import ContextMenu from './components/ContextMenu.vue';

  const appInstance = getCurrentInstance();
  const apiURL = "localhost:3000"
  const areDataLoaded = ref(false);
  const contextData = ref([]);
  const contextVisible = ref(false);

  class Page {
    static title = ref({});
    static blockList = ref([]);

    constructor(data) { 
      for (const value of Object.keys(data)) {
        if (data[value].type == "title") {
          Page.title.value = data[value];
          Page.title.value.id = value;
        } else {
          Page.blockList.value.push(new Block(data[value], value));
        }
      }
    }

    static getBlockKeys() {
      let keys = [];
      Page.blockList.value.forEach((value) => {
        keys.push(value.id);
      })
      return keys;
    }

    static changeTitle(newTitle) {
      Page.title.value.content = newTitle;
      Page.postData();
    }

    static postData() {
      let data = {};
      data[Page.title.value.id] = Page.title.value;
      data[Page.title.value.id].id = undefined;

      Page.blockList.value.forEach((value) => {
        data[value.id] = value.exportDatabase();
      })

      fetch(`http://${apiURL}/page`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({value: data})
      })
        .catch((error) => {
            console.error('Error:', error); // Handle errors
        });
    }

    static getBlockByID(id) {
      for (const block of Page.blockList.value) {
        if (block.id == id) return block;
      }
    }

    static getBlockData(id) {
      const block = Page.getBlockByID(id);
      return block.export();
    }

    static blockContentChange(newContent, id) {
      Page.getBlockByID(id).content = newContent;
    }

    static newBlock(previousBlockID, oldContent) {
      const previousBlock = Page.getBlockByID(previousBlockID);
      let newBlock = new Block(previousBlock.export(), crypto.randomUUID());
      newBlock.content = oldContent;
      newBlock.newlyCreated = true;
      const newBlockIndex = Page.blockList.value.findIndex((value) => value.id == previousBlock.id) + 1;
      Page.blockList.value = [
        ...Page.blockList.value.slice(0, newBlockIndex),
        newBlock,
        ...Page.blockList.value.slice(newBlockIndex)
      ]
    }
  }

  class Block {
    type;
    content;
    textType;
    id;
    newlyCreated = false; // true/false - it is just to set the cursor to the new block after it is created - it is not stored in database

    constructor(block, id) {
      this.type = block.type;
      this.content = block.content;
      this.textType = block.textType;
      this.id = id;
    }

    export() {
      return {
        type: this.type,
        content: this.content,
        textType: this.textType,
        newlyCreated: this.newlyCreated
      }
    }

    exportDatabase() {
      return {
        type: this.type,
        content: this.content,
        textType: this.textType
      }
    }
  }

  onMounted(async () => {
    try {
      const response = await fetch(`http://${apiURL}/page`, {
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

  contextData.value = [
        {
          content: 'Option1',
          subItemsVisible: false,
          subItems: [
            { 
              content: 'Suboption1',
              subItemsVisible: false,
              subItems: [
                { content: "Suboption1 Suboption1" },
                { content: "Suboption1 Suboption2" }
              ]
            },
            { content: 'Suboption2' },
          ],
        },
        {
          content: 'Option2',
          subItemsVisible: false,
          subItems: [
            { 
              content: 'Suboption1',
              subItemsVisible: false,
              subItems: [
                { content: "Suboption1 Suboption1" },
                { content: "Suboption1 Suboption2" }
              ]
            },
            { content: 'Suboption2' },
          ],
        },
    ]
</script>

<template>
  <div class="page-wrapper" v-if="areDataLoaded">
    <PageTitle :data="Page.title.value.content" @titlechange="Page.changeTitle"/>
    <PageBlock v-for="blockKey in Page.getBlockKeys()" :key="blockKey" 
      :data="Page.getBlockData(blockKey)"
      @contentchange="(data) => Page.blockContentChange(data, blockKey)" 
      @newblock="(value) => Page.newBlock(blockKey, value)"
      @showcontext="contextVisible = true" />
  </div>
  <ContextMenu :data="contextData" :previousRight="appInstance.appContext.config.globalProperties.mousePosition.x" v-if="contextVisible" @mouseleave="contextVisible = false" />
</template>

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
