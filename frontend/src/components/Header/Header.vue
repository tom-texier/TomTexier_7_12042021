<template>
    <nav class="main-header">
        <div class="section-container">
            <router-link to="/">
                <img src="../../assets/icon-left-font.png" alt="Logo de Groupomania">
            </router-link>
            <div class="menu">
                <router-link to="/me">
                    <img v-if="user.avatar_url" :src="user.avatar_url" alt="Avatar">
                    <img v-else src="../../assets/default_profile_pic.jpeg" alt="Avatar">
                    <p>{{ user.firstname }} {{ user.lastname }}</p>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    name: "HeaderTop",
    props: [
        'user'
    ]
}

</script>

<style src="./Header.css" scoped></style>