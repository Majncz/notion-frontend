import Block from "@/modules/Block.js";
import { ref } from "vue";
import { useSocketStore } from "@/stores/socket.js";

export default class Page {
  title = "";
  blockList = [];
  id;

  constructor(data) {
    this.title = data.title;
    this.id = data.id;
    data.blocks.forEach(block => {
      this.blockList.push(new Block(block));
    });
  }

  getBlockKeys() {
    let keys = [];
    this.blockList.forEach((value) => {
      keys.push(value.id);
    })
    return keys;
  }

  changeTitle(newTitle) {
    this.title = newTitle;
    useSocketStore().socket.emit("pageChange", {
      item: "title",
      content: newTitle,
      pageId: this.id,
      date: new Date().getTime() // date to indentify which change is newer if someones internet is bad
    });
  }

  getBlockByID(id) {
    for (const block of this.blockList) {
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