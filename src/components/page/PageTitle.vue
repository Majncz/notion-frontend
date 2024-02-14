<template>
    <div>
        <h1 contenteditable="true" @input="handleInput">{{ props.title }}</h1>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['contentChange']);

function handleInput(event) {
    const updatedTitle = event.target.innerText;
    emit('contentChange', updatedTitle);
}
</script>

<style lang="scss" scoped>
div {
    width: 100%;
    padding-top: 6rem;
    padding-bottom: 3rem;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 5rem;
        font-weight: 500;
    }
}
</style>
