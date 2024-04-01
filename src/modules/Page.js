import Block from "@/modules/Block.js";
import { ref } from "vue";
import { useGlobalStore } from "@/stores/global.js";

export default class Page {
    title = ref("");
    blockList = ref([]);

    constructor(data) { 
        this.title = data.title;
        Object.keys(data.blocks).forEach(key => {
            this.blockList.value.push(new Block(data.blocks[key], key));
        });
    }

    getBlockKeys() {
      let keys = [];
      this.blockList.value.forEach((value) => {
        keys.push(value.id);
      })
      return keys;
    }

    changeTitle(newTitle) {
      this.title.value.content = newTitle;
      this.postData();
    }

    postData() {
      let data = {};
      data[this.title.value.id] = this.title.value;
      data[this.title.value.id].id = undefined;

      this.blockList.value.forEach((value) => {
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

    getBlockByID(id) {
      for (const block of this.blockList.value) {
        if (block.id == id) return block;
      }
    }

    getBlockData(id) {
      const block = this.getBlockByID(id);
      return block.export();
    }

    blockContentChange(newContent, id) {
      this.getBlockByID(id).content = newContent;
    }

    newBlock(previousBlockID, oldContent) {
      const previousBlock = this.getBlockByID(previousBlockID);
      let newBlock = new Block(previousBlock.export(), crypto.randomUUID());
      newBlock.content = oldContent;
      newBlock.newlyCreated = true;
      const newBlockIndex = this.blockList.value.findIndex((value) => value.id == previousBlock.id) + 1;
      this.blockList.value = [
        ...this.blockList.value.slice(0, newBlockIndex),
        newBlock,
        ...this.blockList.value.slice(newBlockIndex)
      ]
    }
  }