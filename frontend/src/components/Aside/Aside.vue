<template>
    <aside class="page-aside">
        <header>
            <div class="bg-primary"></div>
            <img v-if="user.avatar_url" :src="user.avatar_url" alt="Avatar">
            <img v-else src="../../assets/default_profile_pic.jpeg" alt="Avatar">
            <h3>{{ user.firstname }} {{ user.lastname }}</h3>
            <p class="job">{{ user.job }}</p>
            <nav>
                <router-link to="/">Toutes les publications</router-link>
            </nav>
            <nav>
                <router-link to="/me">Mon profil</router-link>
                <router-link to="/me/posts">Mes publications</router-link>
                <a @click="signout">Déconnexion</a>
            </nav>
        </header>
        <main>

        </main>
    </aside>
</template>

<script>

import { signoutCall } from '../../mixins/auth'

export default {
    name: "Aside",
    props: [
        'user'
    ],
    methods: {
        signout() {
            signoutCall();
        }
    }
}
</script>

<style src="./Aside.css" scoped></style>