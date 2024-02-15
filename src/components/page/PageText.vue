<template>
    <textarea :class="data.textType" 
        @input="handleInput" 
        @keydown="event => preventEnter(event)" 
        v-model="content" 
        ref="textareaRef"></textarea>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    });

    const textareaRef = ref(null); 

    //textareaRef.value.style.height = 
    

    const content = ref(props.data.content);

    const emit = defineEmits(['contentchange', "newblock"]);

    onMounted(() => {
        if (textareaRef.value) {
            setAreaHeight(textareaRef.value);
        }
        if (props.data.newlyCreated == true) textareaRef.value.focus();
    });

    watch(content, () => {
        emit('contentchange', content.value);
        setAreaHeight(textareaRef.value);
    })

    function setAreaHeight(textarea) {
        console.log(content.value)
        textarea.style.height = '5px';
        textarea.style.height = (textarea.scrollHeight) + "px";
    }

    function handleInput(event) {
        setAreaHeight(event.target);
    }

    function preventEnter(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            const oldContent = content.value.slice(textareaRef.value.selectionStart);
            content.value = content.value.slice(0, textareaRef.value.selectionStart);
            emit("newblock", oldContent);
        }
    }
</script>

<style lang="scss" scoped>
    textarea {
        width: 100%;
        height: 0px;
        border: none;
        resize: none;
    }
    .normal {
        font-size: 1.3rem;
        font-weight: 500;
    }

    .header1 {
        font-size: 3.2rem;
        font-weight: 700;
    }
</style>