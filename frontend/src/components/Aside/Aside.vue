<template>
    <aside class="page-aside">
        <header>
            <div class="bg-primary"></div>
            <img v-if="avatar_url" :src="avatar_url" alt="Avatar">
            <img v-else src="../../assets/default_profile_pic.jpeg" alt="Avatar">
            <h3>{{ user.firstname }} {{ user.lastname }}</h3>
            <p class="job">{{ user.job }}</p>
            <nav>
                <router-link to="/me">Mon profil</router-link>
                <router-link to="/me/posts">Mes publications</router-link>
            </nav>
        </header>
        <main>

        </main>
    </aside>
</template>

<script>
export default {
    name: "Aside",
    props: [
        'user'
    ]
}
</script>

<style src="./Aside.css" scoped></style>