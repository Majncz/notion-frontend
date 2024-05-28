<template>
    <div class="block-wrapper" @mouseover="buttonsVisible = true" @mouseleave="buttonsVisible = false">
        <PageBlockButtons :buttonsVisible="buttonsVisible" @newblock="(value) => $emit('newblock', value)"
            @buttonclick="$emit('showcontext')" />
        <PageText v-if="data.type == 'TEXT'" :data="data" @contentchange="(data) => $emit('contentchange', data)"
            @newblock="(value) => $emit('newblock', value)" />
    </div>
</template>

<script setup>
import PageText from "@/components/page/PageText.vue";
import PageBlockButtons from "@/components/page/PageBlockButtons.vue"
import { ref } from "vue";

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});

const buttonsVisible = ref(false);

const emit = defineEmits(['contentchange', "newblock", "showcontext"]);
</script>

<style lang="scss" scoped>
div.block-wrapper {
    padding-right: 5.5rem;
    width: 100%;
    display: flex;
    align-items: flex-start;
}
</style>
