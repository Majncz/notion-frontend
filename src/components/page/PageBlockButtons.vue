<template>
    <div>
        <button :class="{hidden: !props.buttonsVisible}" @contextmenu.prevent="$emit('buttonclick')" @click="$emit('buttonclick')">
            <img src="@/assets/icons/dots-horizontal.svg" alt="">
        </button>
        <button @click="$emit('newblock', '')" :class="{hidden: !props.buttonsVisible}" @contextmenu.prevent="$emit('buttonclick')">
            <img  src="@/assets/icons/plus.svg" alt="">
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

    const emit = defineEmits(["buttonclick", "newblock"])
</script>

<style lang="scss" scoped>
    div {
        display: flex;
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