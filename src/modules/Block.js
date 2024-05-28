export default class Block {
  type;
  content;
  textType;
  id;
  newlyCreated = false; // it is just to set the cursor to the new block after it is created - it is not stored in a database

  constructor(block) {
    this.type = block.type;
    this.content = block.content;
    this.id = block.id;
    this.textType = block.text_type;
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