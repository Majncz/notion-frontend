<template>
    <div>
        <button :class="{hidden: !props.buttonsVisible}" @contextmenu.prevent="$emit('buttonclick')" @click="$emit('buttonclick')">
            <Icon :imageName="'dots-horizontal'" />
        </button>
        <button @click="$emit('newblock', '')" :class="{hidden: !props.buttonsVisible}" @contextmenu.prevent="$emit('buttonclick')">
            <Icon :imageName="'plus'" />
        </button>
    </div>
</template>

<script setup>
    import Icon from "@/components/Icon.vue"

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
        }
    }
</style>