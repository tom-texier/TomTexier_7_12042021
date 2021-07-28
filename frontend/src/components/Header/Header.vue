<template>
    <nav class="main-header">
        <div class="section-container">
            <router-link to="/">
                <img src="../../assets/icon-left-font.png" alt="Logo de Groupomania">
            </router-link>
            <div class="menu">
                <Avatar
                    :avatar_url="user.avatar_url"
                    :firstname="user.firstname"
                    :lastname="user.lastname"
                    :route="'/me'"
                ></Avatar>
                <div class="toggleMenuResponsive" @click="openResponsiveMenu">
                    <i v-if="!menuVisible" class="fas fa-bars"></i>
                    <i v-else class="fas fa-times"></i>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>

import Avatar from '../Avatar/Avatar'

export default {
    name: "HeaderTop",
    data() {
        return {
            menuVisible: false
        }
    },
    props: [
        'user'
    ],
    components: {
        Avatar
    },
    methods: {
        openResponsiveMenu() {
            document.querySelector('.page-aside').classList.toggle('active');
            this.menuVisible = !this.menuVisible;
        }
    }
}

</script>

<style src="./Header.css" scoped></style>