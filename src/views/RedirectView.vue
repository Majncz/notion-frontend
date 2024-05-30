<template>
    <div>
      <p>Processing login...</p>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      const hash = window.location.hash.substr(1);
      const result = hash.split('&').reduce((res, item) => {
        let parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
      }, {});
      if (result.access_token) {
        this.$router.push({ name: 'Home' });
        localStorage.setItem('access_token', result.access_token);
      }
    }
  }
  </script>