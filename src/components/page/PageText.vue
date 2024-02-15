<template>
    <p :class="data.textType" 
        @keydown="event => preventEnter(event)" 
        contenteditable="true"
        ref="textRef"
        @input="handleInput"></p>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    });

    const textRef = ref();
    const content = ref(props.data.content);
    const emit = defineEmits(['contentchange', "newblock"]);

    onMounted(() => {
        if (props.data.newlyCreated == true) textRef.value.focus();
        textRef.value.innerHTML = props.data.content;
    });

    watch(content, () => {
        emit('contentchange', content.value);
    })

    function handleInput() {
        content.value = textRef.value.innerHTML;
    }

    function logCharsAfterCaret() {
      const selection = window.getSelection();
      if (!selection.rangeCount) return; // Exit if no range is selected
      const range = selection.getRangeAt(0);

      // Create a clone of the contenteditable element for measurement
      const clone = textRef.value.cloneNode(true);
      clone.style.position = 'absolute';
      clone.style.visibility = 'hidden';
      clone.style.width = textRef.value.offsetWidth + 'px';
      document.body.appendChild(clone);

      // Use the range to set the content of the clone up to the caret position
      const rangeClone = range.cloneRange();
      rangeClone.selectNodeContents(textRef.value);
      rangeClone.setEnd(range.endContainer, range.endOffset);
      clone.innerHTML = ''; // Clear the clone first
      clone.appendChild(rangeClone.cloneContents());

      // The caret position in terms of HTML content
      const caretPosHTML = clone.innerHTML.length;

      // Clean up by removing the clone
      document.body.removeChild(clone);

      // Extract content after the caret position, considering HTML markup
      const contentAfterCaretHTML = textRef.value.innerHTML.substring(caretPosHTML);
      const contentBeforeCaretHTML = textRef.value.innerHTML.substring(0, caretPosHTML);
      return {
        before: contentBeforeCaretHTML,
        after: contentAfterCaretHTML
      };
    }

    function preventEnter(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            const caretContent = logCharsAfterCaret();

            textRef.value.innerHTML = caretContent.before;
            content.value = caretContent.before;
            emit("newblock", caretContent.after);
        }
    }
</script>

<style lang="scss" scoped>
    p {
        width: 100%;
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