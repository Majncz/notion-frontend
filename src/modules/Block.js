export default class Block {
  type;
  content;
  textType;
  id;
  newlyCreated = false; // true/false - it is just to set the cursor to the new block after it is created - it is not stored in database

  constructor(block, id) {
    this.type = block.type;
    this.content = block.content;
    this.id = id;
    this.textType = block.textType;
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