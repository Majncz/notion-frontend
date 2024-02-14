<template>
    <div>
        <PageText v-if="data.type == 'text'" :data="data" @contentchange="(data) => $emit('contentchange', data)" @newblock="$emit('newblock')"/>
    </div>
</template>

<script setup>
    import PageText from "@/components/page/PageText.vue";

    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    });

    const emit = defineEmits(['contentchange', "newblock"]);
</script>

<style lang="scss" scoped>
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
</style>