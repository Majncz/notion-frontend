<template>
    <section class="modal">
        <div class="modal-content">
            <h2>Manage users</h2>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { usePageManagerStore } from '@/stores/pageManager';

const users = ref([]);
const pageManagerStore = usePageManagerStore();

// async function getUsers() {
//     const response = await axios.get(`/page/${pageManagerStore.page.id}/user`);
//     users.value = response.data;
//     console.log("users ", users.value);
// }




</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.199);
}
</style>
