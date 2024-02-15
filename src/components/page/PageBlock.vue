<template>
    <div class="block-wrapper" @mouseover="buttonsVisible = true"
        @mouseleave="buttonsVisible = false">
        <PageBlockButtons :buttonsVisible="buttonsVisible" />
        <PageText v-if="data.type == 'text'" :data="data" 
            @contentchange="(data) => $emit('contentchange', data)" 
            @newblock="(value) => $emit('newblock', value)"/>
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

    const emit = defineEmits(['contentchange', "newblock"]);
</script>

<style lang="scss" scoped>
    div.block-wrapper {
        padding-right: 5.5rem;
        width: 100%;
        display: flex;
        align-items: center;
    }
</style>