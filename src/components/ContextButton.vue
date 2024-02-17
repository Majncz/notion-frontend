<template>
    <button class="context-button" @click="$emit('click')">
        <Icon :imageName="'refresh'" />
        <p><slot></slot></p>
    </button>
</template>

<script setup>
import Icon from './Icon.vue';

const emits = defineEmits(["click"]);

</script>

<style lang="scss" scoped>
    button.context-button {
        width: 15rem;
        display: flex;
        align-items: center;
        border: none;
        background-color: transparent;

        &:hover {
            background-color: #e2e2e2;
        }

        > p {
            margin-left: 1rem;
        }
    }
</style>