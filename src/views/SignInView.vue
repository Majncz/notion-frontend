<template>
    <main>
        <h1>Welcome to <b>fotion</b></h1>

        <h2>Before you start sign in</h2>

        <button @click="login" class="button-85">
            <img src="/src/assets/icons/google-logo-2.webp" alt="google logo icon">
            SIGN IN
        </button>

    </main>

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
    mounted() {
    }
}
</script>
<style lang="scss" scoped>
@keyframes glowing-button-85 {
    0% {
        background-position: 0 0;
    }

    50% {
        background-position: 400% 0;
    }

    100% {
        background-position: 0 0;
    }
}

b {
    font-weight: bold;
}

main {
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;

    h1 {
        color: #141618;
        font-size: 3rem;
    }

    h2 {
        color: #32363c;
        font-size: 2rem;
        font-weight: bold;
    }

    img {
        height: 2rem;
        width: 2rem;
    }
}

//https://getcssscan.com/css-buttons-examples

.button-85 {
    display: flex;
    justify-content: flex-start;
    gap: 1.6rem;
    align-items: center;
    font-size: 1.2rem;
    padding: 1rem;
    width: 12rem;
    color: rgb(255, 255, 255);
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    transition: .2s;
}

.button-85:hover {
    scale: 1.05;
}

.button-85:before {
    content: "";
    background: linear-gradient(45deg,
            #ff0000,
            #ff7300,
            #fffb00,
            #48ff00,
            #00ffd5,
            #002bff,
            #7a00ff,
            #ff00c8,
            #ff0000);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing-button-85 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
}


.button-85:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #222;
    left: 0;
    top: 0;
    border-radius: 10px;
}
</style>