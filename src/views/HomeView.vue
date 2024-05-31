<template>
    <div class="home-wrapper">
        <PageList />
        <Page />
    </div>
</template>

<script setup>

import Page from "@/components/Page.vue";
import PageList from "@/components/PageList.vue";

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
