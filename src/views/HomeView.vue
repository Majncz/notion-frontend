<template>
    <div class="home-wrapper">
        <PageList />
        <Page />
        <UsersModal v-show="globalStore.usersModalVisible" />
    </div>
</template>

<script setup>

import Page from "@/components/Page.vue";
import PageList from "@/components/PageList.vue";
import UsersModal from "@/components/UsersModal.vue";
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore();

</script>

<style lang="scss" scoped>
div.home-wrapper {
    width: 100%;
    height: 100%;

    position: relative;

    display: flex;
    gap: 3rem;
}
</style>
