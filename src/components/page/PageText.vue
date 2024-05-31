<template>
    <textarea :class="block.textType.toLowerCase()" ref="textareaRef" v-model="content"
        @keydown="event => preventEnter(event)"></textarea>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const block = defineModel({
    type: Object,
    required: true
});

const emit = defineEmits(['contentchange', "newblock", "delete"]);

const textareaRef = ref(null);
const content = ref(block.value.content); // this may seem unnecessary as it seemingly provides the same purpose as `block.value.content`, but it's here to prevent multiple clients from going into an infinite loop of sending each other's changes that were NOT made by the user but recieved by websocket

onMounted(() => {
    setTimeout(() => {
        textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
    }, 100);

    if (block.value.newlyCreated == true) textareaRef.value.focus();
});

watch(() => block.value.content, () => {
    content.value = block.value.content;
});

watch(() => content.value, () => {
    console.log("JA UZ NEVIM", textareaRef.value.scrollHeight);
    textareaRef.value.style.height = "1rem";
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
    if (content.value == block.value.content) return; // part of the issue of websocket infinite loop described above
    emit('contentchange', content.value);
}, { deep: true });

// setInterval(() => {
//     console.log("idk", textareaRef.value.scrollHeight);
//     textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
// }, 1000);

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
    if (event.keyCode === 8 && content.value == "") {
        emit("delete");
    }
}
</script>

<style lang="scss" scoped>
textarea {
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    overflow-y: scroll;
    height: 1rem;
}

.p {
    font-size: 1.3rem;
    font-weight: 400;
}

.h1 {
    font-size: 3rem;
    font-weight: 700;
}
</style>