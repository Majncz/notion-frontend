<template>
    <div class="context-menu" ref="contextMenuRef">
      <ContextMenuButton
        v-for="(item, index) in props.menuItems"
        :key="index"
        :content="item.content"
        :subItems="item.subItems"
        :firstLayer="true"
      ></ContextMenuButton>
    </div>
  </template>
  
  <script setup>
    import { onMounted, ref, watch } from 'vue';
    import ContextMenuButton from './ContextMenuButton.vue';
  
    const props = defineProps({
        menuItems: {
            type: Array,
            required: true,
        },
        mousePosition: {
            type: Object,
            required: true
        }
    })
    const contextMenuRef = ref();

    onMounted(() => {
        contextMenuRef.value.style.top = props.mousePosition.y + "px";
        contextMenuRef.value.style.left = props.mousePosition.x + "px";
    })
  </script>
  
  <style lang="scss" scoped>
  .context-menu {
    position: absolute;
    background-color: #F1F1F1;
    border: 1px solid #CBCBCB;
    width: fit-content;
    border-radius: 0.6rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  </style>