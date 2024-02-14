<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { ref } from "vue"
  import PageTitle from "@/components/page/PageTitle.vue";
  import PageBlock from "@/components/page/PageBlock.vue";

  const pageData = ref({
  })

  getData();

  function handleBlockContentChange(data, blockKey) {
    pageData.value[blockKey] = data;
    console.log(pageData.value[blockKey]);
    postData();
  }

  function getBlockKeys() {
    return Object.keys(pageData.value).filter((value) => value != "title");
  }

  function createBlock() {
    pageData.value[crypto.randomUUID()] = {
      type: "text",
      content: "Type smothing",
      textType: "p"
    }

    postData();
  }

  function getData() {
    fetch(`http://localhost:3000/page`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    })
      .then(response => response.json()) // Parse the JSON response
      .then(data => {
          pageData.value = data;
      })
      .catch((error) => {
          console.error('Error:', error); // Handle errors
      }); 
  }

  function postData() {
    fetch(`http://localhost:3000/page`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({value: pageData.value})
    })
      .catch((error) => {
          console.error('Error:', error); // Handle errors
      });
  }
</script>

<template>
  <div class="page-wrapper">
    <PageTitle :title="pageData.title" @contentChange="(value) => {pageData.title = value; postData()}"/>
    <PageBlock v-for="(blockKey, i) in getBlockKeys()" :key="i" :data="pageData[blockKey]" @contentchange="(data) => handleBlockContentChange(data, blockKey)" @newblock="createBlock"/>
  </div>
</template>

<style lang="scss" scoped>
  div.page-wrapper {
    width: 90%;
    max-width: 1200px;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
