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

  changeTitle(newTitle) {
    this.title = newTitle;
    useSocketStore().socket.emit("pageChange", {
      item: "title",
      content: newTitle,
      pageId: this.id,
      date: new Date().getTime() // date to indentify which change is newer if someones internet is bad
    });
  }

  contentChange(newContent, blockId) {
    this.getBlockById(blockId).content = newContent;
    useSocketStore().socket.emit("pageChange", {
      item: "blockText",
      content: newContent,
      pageId: this.id,
      blockId: blockId,
      date: new Date().getTime() // date to indentify which change is newer if someones internet is bad
    });
  }

  getBlockById(id) {
    for (const block of this.blockList) {
      if (block.id == id) return block;
    }
  }

  // from user
  newBlock(currentBlockOrder, content = "") {
    const newBlock = new Block({ order: currentBlockOrder + 1, content: content });
    newBlock.newlyCreated = true;
    this.blockList.push(newBlock);

    this.blockList.forEach(block => {
      if (block.order >= newBlock.order && block.id != newBlock.id) block.order++;
    });

    useSocketStore().socket.emit("pageChange", {
      item: "newBlock",
      pageId: this.id,
      blockId: newBlock.id,
      order: newBlock.order,
      content: newBlock.content,
      date: new Date().getTime()
    });
  }

  // from socket.io
  pushBlock(data) {
    this.blockList.push(new Block({ order: data.order, id: data.blockId, content: data.content }));
    this.blockList.forEach(block => {
      if (block.order >= data.order && block.id != data.blockId) block.order++;
    });
  }
}

