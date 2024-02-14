<template>
    <textarea v-if="data.textType == 'p'" class="p" @input="handleInput" @keydown="event => preventEnter(event)" v-model="content" ref="textareaRef"></textarea>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    });

    const textareaRef = ref(null); 

    const content = ref(props.data.content);

    const emit = defineEmits(['contentchange', "newblock"]);

    onMounted(() => {
        if (textareaRef.value) {
            setAreaHeight(textareaRef.value);
        }
    });

    function setAreaHeight(textarea) {
        textarea.style.height = textarea.scrollHeight + "px";
    }

    function handleInput(event) {
        setAreaHeight(event.target)
        emit('contentchange', {
            content: content.value,
            textType: "p"
        });
    }

    function preventEnter(event) {
        if (event.keyCode === 13) {
            if (event.shiftKey) {
                return;
            }   
            event.preventDefault();
            emit("newblock");
        }
    }
</script>

<style lang="scss" scoped>
    .p {
        font-size: 1.3rem;
        font-weight: 500;
        height: 0px;
        border: none;
        resize: none;
    }
</style>