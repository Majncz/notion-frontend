<template>
    <div :class="{menuItem: true, menuItemFirst: props.firstLayer}">
      <div @click="toggleDropdown">{{ content }}</div>
      <div v-if="isOpen" class="sub-menu">
        <context-menu-button
          v-for="(subItem, index) in subItems"
          :key="index"
          :content="subItem.content"
          :subItems="subItem.subItems"
          :first-layer="false"
        ></context-menu-button>
      </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';


    const props = defineProps({
        content: {
            type: String,
            required: true
        },
        subItems: {
            type: Array,
            default: () => []
        },
        firstLayer: {
            type: Boolean,
            required: true
        }
    })

    const isOpen = ref(false)

    function toggleDropdown() {
        isOpen.value = !isOpen.value;
    }
</script>
  
<style lang="scss" scoped>
    .menuItem:not(.menuItemFirst) {
        background-color: #F1F1F1;
        border: 1px solid #CBCBCB;
        width: fit-content;
        border-radius: 0.6rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: relative;
        left: 3rem;
    }

    .sub-menu {
        
    }
</style>
  