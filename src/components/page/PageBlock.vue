<template>
    <div class="block-wrapper" @mouseover="buttonsVisible = true" @mouseleave="buttonsVisible = false">
        <PageBlockButtons :buttonsVisible="buttonsVisible" @newblock="page.newBlock(block.order)" />
        <PageText v-if="page.getBlockById(props.blockId).type == 'TEXT'" v-model="block"
            @contentchange="(data) => { page.contentChange(data, props.blockId); console.log('CONTENT CHANGE') }"
            @newblock="(content) => page.newBlock(block.order, content)" />
    </div>
</template>

<script setup>
import PageText from "@/components/page/PageText.vue";
import PageBlockButtons from "@/components/page/PageBlockButtons.vue"
import { ref, computed, watch } from "vue";
import { usePageManagerStore } from "@/stores/pageManager.js";

const props = defineProps({
    blockId: {
        type: String,
        required: true
    }
});

const page = defineModel({
    type: Object,
    required: true
});

const block = ref(page.value.getBlockById(props.blockId));

const buttonsVisible = ref(false);

watch(() => page, (newVal) => {
    console.log("PAGE CHANGED");
    block.value = page.value.getBlockById(props.blockId);
    console.log(block.value);
}, { deep: true })



</script>

<style lang="scss" scoped>
div.block-wrapper {
    padding-right: 5.5rem;
    width: 100%;
    display: flex;
    align-items: flex-start;
    order: v-bind("block.order");
}
</style>
