<template>
    <div class="overlay-wrapper" ref="overlayRef" v-show="isVisible" @mouseleave="() => {isVisible = false; $emit('visible', isVisible)}">
        <slot></slot>
    </div>
</template>

<script setup>
    import { onMounted, ref, watch } from 'vue';

    const props = defineProps({
        isVisible: {
            type: Boolean,
            required: true
        }
    });

    const overlayRef = ref();
    const isVisible = ref(false);

    watch(props, () => {
        isVisible.value = props.isVisible;
    }, {deep: true})

    onMounted(() => {
        document.addEventListener("mousemove", (event) => {
            if (!props.isVisible) {
                overlayRef.value.style.top = (event.clientY - 20) + "px";
                overlayRef.value.style.left = (event.clientX - 20) + "px";
            }
        })
    })
</script>

<style lang="scss" scoped>
    div.overlay-wrapper {
        position: absolute;
        width: 4rem;
        height: 4rem;
        background-color: antiquewhite;
    }
</style>