<template>
    <div>
        <button @click="$emit('newblock', '')" :class="{hidden: !props.buttonsVisible}">
            <img  src="@/assets/icons/plus.svg" alt="">
        </button>
        <button :class="{hidden: !props.buttonsVisible}">
            <img src="@/assets/icons/dots-horizontal.svg" alt="">
        </button>
    </div>
</template>

<script setup>
    const props = defineProps({
        buttonsVisible: {
            type: Boolean,
            required: true
        }
    });
</script>

<style lang="scss" scoped>
    div {
        display: flex;
        flex-direction: row-reverse;
        padding-right: 1rem;
        button {
            background-color: transparent;
            border: none;

            &.hidden {
                visibility: hidden;
            }

            &:hover {
                cursor: pointer;
            }

            img {
                width: 1.75rem;
                height: 1.75rem;
                filter: invert(67%) sepia(5%) saturate(96%) hue-rotate(317deg) brightness(78%) contrast(81%);
            }
        }
    }
</style>