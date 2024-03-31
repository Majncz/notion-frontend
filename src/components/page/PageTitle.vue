<template>
    <div>
        <h1 contenteditable="true" @input="handleInput">{{ props.data }}</h1>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    data: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['titlechange']);

function handleInput(event) {
    const updatedTitle = event.target.innerText;
    emit('titlechange', updatedTitle);
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
