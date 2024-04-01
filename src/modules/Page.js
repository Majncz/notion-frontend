import Block from "@/modules/Block.js";
import { ref } from "vue";
import { useGlobalStore } from "@/stores/global.js";

export default class Page {
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

      fetch(`http://${useGlobalStore().apiUrl}/page`, {
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