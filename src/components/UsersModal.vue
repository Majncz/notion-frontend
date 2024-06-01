<template>
    <section class="modal" @click="globalStore.usersModalVisible = false">
        <div class="modal-content" @click.stop>
            <h2>Manage users</h2>
            <div class="users">
                <div class="user" v-for="user in users" :key="user.email">
                    <p>{{ user.name }}</p>
                    <button><img src="../assets/icons/icon-user-remove.svg" alt=""></button>
                </div>
            </div>
            <div class="new-user">
                <label for="userEmail">Add new user:</label>
                <input type="email" id="userEmail" placeholder="User Email" v-model="userEmail">
                <button @click="addUser"><img src="../assets/icons/user-add.svg" alt=""></button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { usePageManagerStore } from '@/stores/pageManager';
import { useGlobalStore } from '@/stores/global';

const users = ref([]);
const pageManagerStore = usePageManagerStore();
const globalStore = useGlobalStore();

const userEmail = ref("");

async function getUsers() {
    const response = await axios.get(`/page/${pageManagerStore.page.id}/user`);
    users.value = response.data;
    console.log("users ", users.value);
}

getUsers();

async function addUser() {
    await axios.post(`/page/${pageManagerStore.page.id}/user`, { email: userEmail.value });
    getUsers();
}




</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.199);

    display: flex;
    justify-content: center;
    align-items: center;

    .modal-content {
        background-color: white;
        width: 50%;
        padding: 3rem;
        border-radius: 0.8rem;

        h2 {
            margin-bottom: 2rem;
            font-size: 1.3rem;
            font-weight: 500;
        }

        div.new-user {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        div.user {
            width: 100%;
            font-size: 1.2rem;
            font-weight: 500;
            border-radius: 0.5rem;
            padding: 0.5rem 1rem;

            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;

            cursor: pointer;

            transition: background-color 0.1s;

            &:hover {
                background-color: rgb(240, 240, 240);
            }

            button {
                background-color: transparent;
                border: none;
                padding: 0.5rem 1rem;

                transition: background-color 0.1s;
                border-radius: 0.5rem;

                &:hover {
                    background-color: rgba(255, 47, 47, 0.167);
                }
            }

            img {
                width: 1.5rem;
                height: 1.5rem;
            }


        }
    }
}
</style>
