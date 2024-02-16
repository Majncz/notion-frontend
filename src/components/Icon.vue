<template>
    <img :src="src" alt="">
</template>

<script setup>
    import { ref, watch } from 'vue';

    const props = defineProps({
        imageName: {
            type: String,
            required: true
        }
    });
    const src = ref();


    import(`@/assets/icons/${props.imageName}.svg`).then((module) => {
        src.value = module.default;
    }).catch(error => console.error("Failed to load icon:", error));
</script>

<style lang="scss" scoped>
    img {
        width: 1.75rem;
        height: 1.75rem;
        filter: invert(67%) sepia(5%) saturate(96%) hue-rotate(317deg) brightness(78%) contrast(81%);
    }
</style>