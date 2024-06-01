<template>
    <div>
      <button @click="login">Přihlásit se přes Google</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      login() {
        const clientId = '263164227738-3ue7ai4m5hdsjul67skup5q9o2mfk59n.apps.googleusercontent.com';
        const redirectUri = 'http://localhost:5173/callback';
        const scope = 'profile email';
        const responseType = 'token';
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
        window.location.href = authUrl;
      }
    },
    mounted(){
      if (localStorage.getItem('user')) {
        window.location.href = '/';
      }
    }
      
    
  }
  </script>