<template>
    <div>
      <p>Processing login...</p>
    </div>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    
    mounted() {
      const hash = window.location.hash.substr(1);
      const result = hash.split('&').reduce((res, item) => {
        let parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
      }, {});
      console.log(result);

      if (result.access_token) {
        localStorage.setItem('access_token', result.access_token);
        axios.post('http://localhost:8080/ranajakub/fotionapi/', { message: result.access_token })
        .then(response => {
          console.log('Response:', response.data);
          localStorage.setItem('userId', response.data);
          console.log('-----------')
          let userId = localStorage.getItem('userId')
          console.log(userId)
          console.log('-----------')
        })
        .catch(error => {
          console.error('There was an error!', error);
        });


        //this.$router.push({ name: 'home' });
     }
     
    }
  }
/*
  // insert new user to database
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.fotion_user.create({
    data: {
      email: 'example@example.com',
      name: 'John Doe',
      provider: 'GOOGLE',
      providerId: '123456789',
      accessToken: 'youraccesstoken',
      refreshToken: 'yourrefreshtoken'
    },
  });

  console.log('New user created:', newUser);
}
/*
main()
  .catch(e => {
    console.error('Error creating user:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  */
  </script>