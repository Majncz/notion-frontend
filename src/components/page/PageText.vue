<template>
    <textarea :class="data.textType" ref="textareaRef" v-model="content" @keydown="event => preventEnter(event)"></textarea>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    });

    const emit = defineEmits(['contentchange', "newblock"]);

    const textareaRef = ref(null);
    const content = ref("");

    onMounted(() => {
        content.value = props.data.content;
        setTimeout(() => {
            textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
        }, 100);
        if (props.data.newlyCreated == true) textareaRef.value.focus();
    });

    watch(content, () => {
        textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
        emit('contentchange', content.value);
    })

    function logCharsAfterCaret() {
        const textarea = textareaRef.value;
        if (!textarea) return { before: '', after: '' };
        const caretPos = textarea.selectionStart;
        const textBeforeCaret = textarea.value.substring(0, caretPos);
        const textAfterCaret = textarea.value.substring(caretPos);
        return { before: textBeforeCaret, after: textAfterCaret };
    }

    function preventEnter(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            const caretContent = logCharsAfterCaret();
            console.log(caretContent);

            content.value = caretContent.before;
            emit("newblock", caretContent.after);
        }
    }
</script>

<style lang="scss" scoped>
    textarea {
        width: 100%;
        border: none;
        outline: none;
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