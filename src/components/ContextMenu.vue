<template>
    <div class="context-menu" @click.self.prevent="contextStore.visible = false">
        <div class="context-section" v-for="section in contextData.filter(section => section.visible)" :style="{
        left: `${section.position ? section.position.x : mousePosition.x}px`,
        top: `${section.position ? section.position.y : mousePosition.y}px`
    }" @mouseleave="() => console.log('Mouse left')">
            <button v-for="item in section.items"
                @click="() => { changeChildVisibility(item.uuid, $event), item.action() }">
                <p>{{ item.text }}</p>
                <img src="/chevron-right.svg" alt="chevron-right"
                    v-if="contextData.map(section => section.parent).includes(item.uuid)">
            </button>
        </div>
    </div>
</template>

<script setup>

import { useContextStore } from '../stores/context'
import { ref, getCurrentInstance, watch } from 'vue';

const contextStore = useContextStore();
const appInstance = getCurrentInstance();
const mousePosition = { ...appInstance.appContext.config.globalProperties.mousePosition };

const contextData = ref(contextStore.dropdownArray());

watch(() => contextStore.dropdown, (newVal) => {
    console.log("MAKARENA");
    contextData.value = contextStore.dropdownArray();
});

function changeChildVisibility(uuid, event) {
    try {
        let buttonRect = event.target.getBoundingClientRect();
        if (event.target.tagName !== 'BUTTON') {
            buttonRect = event.target.parentElement.getBoundingClientRect();
        }
        const newPosition = {
            x: buttonRect.right, // Use `right` for the x position to align with the button's right edge
            y: { ...appInstance.appContext.config.globalProperties.mousePosition }.y // Use `top` for the y position
        };

        contextData.value = contextData.value.map(section => {
            if (section.parent === uuid) {
                return {
                    ...section,
                    visible: !section.visible,
                    position: newPosition
                };
            } else {
                return section;
            }
        });
    } catch (error) {
        contextStore.visible = false;
    }
}
</script>

<style lang="scss" scoped>
div.context-menu {
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;

    .context-section {
        display: flex;
        flex-direction: column;
        position: absolute;
        background: #fdfdfd;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border: 1px solid #e5e7eb;

        button {
            border: none;
            background: none;
            text-align: start;
            padding: 0.5rem 0.9rem;
            font-size: 1rem;
            font-weight: 400;

            display: flex;
            align-items: center;
            justify-content: space-between;

            &:first-child {
                padding-top: 0.8rem;
            }

            &:last-child {
                padding-bottom: 0.8rem;
            }

            &:hover {
                background: #f5f7fa;
            }

            img {
                width: 1rem;
                height: 1rem;
                margin-left: 2rem;
            }
        }
    }
}
</style>
