<template>
    <div class="menu-wrapper" ref="thisMenu" v-show="props.isVisible">
        <ContextButton v-for="(item, i) in props.data" @click="buttonHover(i, true)">{{ item.content }}</ContextButton>
    </div>
    <div>
        <ContextMenu v-for="(item, i) in getSubItems()" :data="item.subItems" 
        :previousRight="thisMenuRight"
        :isVisible="item.subItemsVisible" />
    </div>
     
</template>

<script setup>
    import { watch, ref, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, getCurrentInstance } from 'vue';
    import ContextButton from './ContextButton.vue';

    const props = defineProps({
        data: {
            type: Array,
            required: true
        },
        previousRight: {
            type: Number,
            required: true
        },
        isVisible: {
            type: Boolean,
            default: true
        }
    })

    const appInstance = getCurrentInstance();
    const thisMenu = ref();
    const data = ref(props.data);
    const thisMenuRight = ref();

    function buttonHover(index, state) {
        if (data.value[index].subItemsVisible == undefined) return;
        data.value[index].subItemsVisible = state;
    }

    function getSubItems() {
        return data.value.filter((value) => value.subItemsVisible == true)
    }

    watch(() => props.isVisible, () => {
        thisMenuRight.value = thisMenu.value.getBoundingClientRect().right;
    })

    function changePosition() {
        if (props.isVisible) return;
        thisMenu.value.style.top = (appInstance.appContext.config.globalProperties.mousePosition.y - 20) + "px";
        thisMenu.value.style.left = (props.previousRight - 20) + "px";
    }

    document.addEventListener("mousemove", changePosition);

    onBeforeUnmount(() => {
        document.removeEventListener("mousemove", changePosition);
    })

    onMounted(() => {
        thisMenu.value.style.top = (appInstance.appContext.config.globalProperties.mousePosition.y - 20) + "px";
        thisMenu.value.style.left = (props.previousRight - 20) + "px";
        thisMenuRight.value = thisMenu.value.getBoundingClientRect().right;
        console.log("hej")
    })
</script>

<style lang="scss" scoped>
    div.menu-wrapper {
        border-radius: 0.8rem;
        border: 1px solid #CBCBCB;
        background: #F1F1F1;
        box-shadow: 0px 4px 12.6px 0px rgba(0, 0, 0, 0.25);

        display: flex;
        flex-direction: column;

        position: absolute;
        overflow: hidden;

        button.context-button {
            padding-left: 1rem;
            padding-right: 1rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            &:first-child {
                padding-top: 1rem;
            }
            &:last-child {
                padding-bottom: 1rem;
            }
        }


    }
</style>