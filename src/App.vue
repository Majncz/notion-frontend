<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { onBeforeMount, ref, onMounted } from "vue"
  import PageTitle from "@/components/page/PageTitle.vue";
  import PageBlock from "@/components/page/PageBlock.vue";

  const apiURL = "localhost:3000"
  const areDataLoaded = ref(false);

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
    }

    static postData() {
      let data = {};
      data[Page.title.value.id] = Page.title.value;
      data[Page.title.value.id].id = undefined;

      Page.blockList.value.forEach((value) => {
        data[value.id] = value.export();
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

    static newBlock(previousBlockID) {
      const previousBlock = Page.getBlockByID(previousBlockID);
      let newBlock = new Block(previousBlock.export(), crypto.randomUUID());
      newBlock.content = "T";
      Page.blockList.value.push(newBlock);

      console.log(Page.blockList.value);
    }
  }

  class Block {
    type;
    content;
    textType;
    id;

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
</script>

<template>
  <div class="page-wrapper" v-if="areDataLoaded">
    <PageTitle :data="Page.title.value.content" @titlechange="Page.changeTitle"/>
    <PageBlock v-for="(blockKey, i) in Page.getBlockKeys()" :key="i" 
      :data="Page.getBlockData(blockKey)"
      @contentchange="(data) => Page.blockContentChange(data, blockKey)" 
      @newblock="Page.newBlock(blockKey)"/>
  </div>
</template>

<style lang="scss" scoped>
  div.page-wrapper {
    width: 90%;
    max-width: 1200px;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
