<template>
    <div>
        <button :class="{ hidden: !props.buttonsVisible }" @contextmenu.prevent="showContextMenu"
            @click="showContextMenu">
            <Icon :imageName="'dots-horizontal'" />
        </button>
        <button @click="$emit('newblock', '')" :class="{ hidden: !props.buttonsVisible }"
            @contextmenu.prevent="showContextMenu">
            <Icon :imageName="'plus'" />
        </button>
    </div>
</template>

<script setup>
import Icon from "@/components/Icon.vue"
import { useContextStore } from "@/stores/context";

const contextStore = useContextStore();

const props = defineProps({
    buttonsVisible: {
        type: Boolean,
        required: true
    },
    blockId: {
        type: String,
        required: true
    }
});

const page = defineModel({
    type: Object,
    required: true
});

const emit = defineEmits(["newblock"])

function showContextMenu() {
    contextStore.dropdown = [
        {
            text: "Delete",
            action: () => {
                page.value.deleteBlock(props.blockId);
            }
        }
    ];
    console.log("showContextMenu", contextStore.dropdown);
    contextStore.visible = true;
}
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