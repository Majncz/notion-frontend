<template>
    <div>
        <PageText v-if="data.type == 'text'" :data="{content: data.content, textType: data.textType}" @contentchange="handleChange" @newblock="newBlock"/>
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

    function handleChange(data) {
        let updatedContent = data;
        updatedContent["type"] = "text";
        emit('contentchange', updatedContent);
    }

    function newBlock() {
        emit("newblock");
    }
</script>

<style lang="scss" scoped>
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
</style>