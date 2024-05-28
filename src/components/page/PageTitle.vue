<template>
    <div>
        <h1 contenteditable="true" @input="handleInput">{{ props.data }}</h1>
    </div>
</template>

<script setup>
import { usePageManagerStore } from "@/stores/pageManager.js";

const pageManagerStore = usePageManagerStore();

const props = defineProps({
    data: {
        type: String,
        required: true
    },
    pageId: {
        type: String,
        required: true
    }
});

function handleInput(event) {
    pageManagerStore.getPageById(props.pageId).changeTitle(event.target.innerText);
}
</script>

<style lang="scss" scoped>
div {
    padding-left: 5.5rem;
    width: 100%;
    padding-top: 6rem;
    padding-bottom: 3rem;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 4rem;
        font-weight: 700;
        color: #32363c;
    }
}
</style>
